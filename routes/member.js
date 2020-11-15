const express = require('express');
const conn = require('../dbConnect');

const router = express.Router();

router.post('/login', (req, res, next) => {
    try {
        
        conn.query(
            `SELECT COUNT(*) AS chk FROM member WHERE user_id = '${req.body.user_id}'`,
            (err, row, fields) => {
             res.send(row);   
            })
    } catch (error) {
        throw new Error(error);
    } 
});

module.exports = router;