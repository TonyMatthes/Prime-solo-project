const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET Rating
 */
router.get('/', (req, res) => {
    pool.query(`SELECT AVG("rating")
    FROM "ratings"
    WHERE "bathroom_id" = $1`,
    [req.body.bathroomId])
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});

/**
 * POST Rating
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    pool.query(`INSERT INTO "ratings" ("rating", "bathroom_id","person_id")
    VALUES($1, $2 , $3)
    ON CONFLICT ("bathroom_id","person_id") 
    DO UPDATE SET "rating"=$1;`,
    [req.body.rating,req.body.id,req.user.id])
        .then((results) => {
            res.send((results.rows))
        })
        .catch((error) => {
            console.log('error getting bathrooms', error)
        })

});



module.exports = router;