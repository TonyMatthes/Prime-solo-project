const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET ALL types
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "type"`)
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting types', error)
        })

});



module.exports = router;