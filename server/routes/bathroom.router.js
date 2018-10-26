const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios')

/**
 * GET ALL bathrooms
 */
router.get('/', (req, res) => {
    console.log(req.query)
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
    (SELECT "id", "address","type","additional_directions",
    (3959 * acos(cos(radians($1)) * cos(radians("latitude")) *
    cos(radians("longitude") - radians($2)) +
    sin(radians($1)) * sin(radians("latitude"))))
    AS distance, "latitude","longitude"
    FROM "bathroom") AS distances
    WHERE distance < 5
    ORDER BY distance
    OFFSET 0
    LIMIT 1;`,[req.query.latitude, req.query.longitude])
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
    console.log(req.body)
    axios({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        params: {
            address: req.body.address,
            key: 'AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'
        }
    }).then(response => {
        let coords = response.data.results[0].geometry.location
        pool.query(`INSERT INTO "bathroom" ("address", "city", "latitude", "longitude", "type", "additional_directions")
                VALUES ($1, $2, $3, $4, $5, $6)`,
            [req.body.address, req.body.city, coords.lat, coords.lng, req.body.type, req.body.additionalDirections])
            .then(() => res.sendStatus(200))
            .catch((error) => {
                console.log('Error Adding Bathroom to Database: ', error)
                res.sendStatus(500);
            });
    }).catch(error => {
        console.log('Error in contacting google geocoding api:', error)
    });
// router.post('/', (req, res) => {
//     console.log(req.body)
//     axios({
//         method: 'GET',
//         url: 'https://maps.googleapis.com/maps/api/geocode/json',
//         params: {
//             address: req.body.address,
//             key: 'AIzaSyB675LdwmXlgKaIpAvXeOUIjlZU8Zl1TkQ'
//         }
//     }).then(response => {
//         let coords = response.data.results[0].geometry.location
//         pool.query(`INSERT INTO "bathroom" ("address", "city", "latitude", "longitude", "type", "additional_directions")
//                 VALUES ($1, $2, $3, $4, $5, $6)`,
//             [req.body.address, req.body.city, coords.lat, coords.lng, req.body.type, req.body.additionalDirections])
//             .then(() => res.sendStatus(200))
//             .catch((error) => {
//                 console.log('Error Adding Bathroom to Database: ', error)
//                 res.sendStatus(500);
//             });
//     }).catch(error => {
//         console.log('Error in contacting google geocoding api:', error)
//     });


});

module.exports = router;