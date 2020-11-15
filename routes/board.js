const express = require('express');

const router = express.Router();
const conn = require('../dbConnect.js')

router.get('/blogApi/recentPosts/:category', (req, res) => {
    conn.query(
        `SELECT * FROM board_post bp, board b 
        where b.board_no = bp.board_no and b.board_name = '${req.params.category}'`,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

router.get('/blogApi/Posts/postview', (req, res) => {
    conn.query(
        `SELECT * FROM board_post bp
        where bp.board_no = ${req.query.board_no} and bp.post_no = ${req.query.post_no}`,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

module.exports = router;
