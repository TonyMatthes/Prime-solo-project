const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const axios = require('axios')

/**
 * GET ALL bathrooms
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "bathroom"`)
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});

/**
 * GET closest bathrooms
 * uses the haversine formula to calculate distances and 
 * return results closest to farthest
 */
router.get('/closest', (req, res) => {
    pool.query(`SELECT * FROM
    (SELECT "id", "address","type","additional_directions","place_name",
    (3959 * acos(cos(radians($1)) * cos(radians("latitude")) *
    cos(radians("longitude") - radians($2)) +
    sin(radians($1)) * sin(radians("latitude"))))
    AS distance, "latitude","longitude"
    FROM "bathroom") AS distances
    WHERE distance < 5
    ORDER BY distance
    OFFSET 0
    LIMIT $3;`, [req.query.latitude, req.query.longitude, req.query.limit])
        .then((results) => {
            res.send(results.rows)
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
    pool.query(`INSERT INTO "bathroom" ("address", "latitude", "longitude", "type", "additional_directions","place_name")
                VALUES ($1, $2, $3, $4, $5, $6)`,
        [req.body.address, req.body.position.lat, req.body.position.lng, req.body.type, req.body.additionalDirections, req.body.name])
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
// router.put('/:id', (req, res) => {
//     console.log(req.params)
//      pool.query('DELETE FROM "bathroom" WHERE id=$1', [req.params.id])
//         .then(() => { res.sendStatus(200); })
//         .catch((err) => {
//             console.log('Error in DELETE', err);
//             res.sendStatus(500);
//         });
// });



module.exports = router;