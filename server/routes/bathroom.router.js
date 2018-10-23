const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const axios = require('axios')

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "bathroom"`)
    .then((results)=>{
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
    pool.query(`INSERT INTO "bathroom" ("address", "city", "latitude", "longitude", "type", "additional_directions")
                VALUES ($1, $2, $3, $4, $5, $6)`, 
                [req.body.address, req.body.city, req.body.latitude, req.body.longitude, req.body.type, req.body.additionalDirections])
        .then(() => res.sendStatus(200))
        .catch((error) => {
            console.log('Error Adding Item: ', error)
            res.sendStatus(500);
        });
});

module.exports = router;