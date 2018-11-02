const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const axios = require('axios')

// const deNullifier = (array) =>{for(item in array)item === null ? [] : array}

/**
 * GET ALL bathrooms
 */
router.get('/', (req, res) => {
    pool.query(`SELECT "bathroom"."id",  
                        "bathroom"."place_name",
                        "bathroom"."address",
                        "bathroom"."latitude",
                        "bathroom"."longitude",
                        "bathroom"."type",
                        "bathroom"."additional_directions",
                        array_agg("amenities"."name") as "amenities_present",
                        array_agg("type"."name") AS "type"
                FROM "amenities_bathroom_join"
                JOIN "amenities" ON "amenities"."id" = "amenities_bathroom_join"."amenities_id"
                FULL OUTER JOIN "bathroom" ON "bathroom"."id" = "amenities_bathroom_join"."bathroom_id"
                LEFT JOIN "type_bathroom_join" ON "bathroom"."id"="type_bathroom_join"."bathroom_id"
                LEFT JOIN "type" on "type"."id"="type_bathroom_join"."type_id"
                GROUP BY "bathroom"."id"`)
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});

/**
 * GET closest bathrooms
 * uses the haversine formula to calculate distances and 
 * return results closest to farthest
 * and array_agg to get arrays of types and ammenities
 */
router.get('/closest', (req, res) => {
    pool.query(
        `SELECT * FROM
            (SELECT "bathroom"."id", "bathroom"."address",
            (3959 * acos(cos(radians($1)) * cos(radians("bathroom"."latitude")) *
                cos(radians("bathroom"."longitude") - radians($2)) +
                sin(radians($1)) * sin(radians("latitude"))))AS distance, 
            "bathroom"."latitude",
            "bathroom"."longitude",
            "bathroom"."place_name",
            "bathroom"."additional_directions",
            array_agg("amenities"."name") AS "amenities_present",
            array_agg("type"."name") AS "type"
    FROM "amenities_bathroom_join"
    JOIN "amenities" ON "amenities"."id" = "amenities_bathroom_join"."amenities_id"
    FULL OUTER JOIN "bathroom" ON "bathroom"."id" = "amenities_bathroom_join"."bathroom_id"
    FULL OUTER JOIN "type_bathroom_join" ON "bathroom"."id"="type_bathroom_join"."bathroom_id"
    FULL OUTER JOIN "type" on "type"."id"="type_bathroom_join"."type_id"
    GROUP BY "bathroom"."id") 
    AS distances
    WHERE distance < 100
    ORDER BY distance
    OFFSET 0
    LIMIT $3
    ;`, [req.query.latitude, req.query.longitude, req.query.limit]
)
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});
/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in POST, posting: ', req.body)
    let typeMap = req.body.types.map(type=>`(${type},(select "id" from "first_insert"))`)
    let amenityMap = req.body.amenities.map(amenity=>`(${amenity},(select "id" from "first_insert"))`)
    let queryText= `
    WITH "first_insert" AS (
        INSERT INTO "bathroom" ("address", "latitude", "longitude", "place_name", "additional_directions") 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id"
      ), "second_insert" AS (
      INSERT INTO "type_bathroom_join" ("type_id", "bathroom_id")
      VALUES 
      ${typeMap}
        RETURNING "bathroom_id")
      INSERT INTO "amenities_bathroom_join"("amenities_id", "bathroom_id")
      VALUES
      ${amenityMap};
        `
        console.log(queryText)
    pool.query(queryText,
        [req.body.address, req.body.position.lat, req.body.position.lng, req.body.name, req.body.additionalDirections])
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.log('Error Adding Bathroom to Database: ', error)
            res.sendStatus(500);
        });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in DELETE, deleting:', req.params)
    pool.query('DELETE FROM "bathroom" WHERE id=$1', [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error in DELETE', err);
            res.sendStatus(500);
        });
});
router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params)
     pool.query(`UPDATE "bathroom" WHERE id=$1`, [req.params.id])
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error in DELETE', err);
            res.sendStatus(500);
        });
});



module.exports = router;