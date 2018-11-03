const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET ALL Amenities
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "amenities"
                ORDER BY "id"`)
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});



module.exports = router;