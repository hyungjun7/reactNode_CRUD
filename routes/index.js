const express = require('express');

const router = express.Router();
const conn = require('../dbConnect.js')

router.get('/blogApi/recentPosts', (req, res) => {
    conn.query(
        "SELECT * FROM board_post",
        //SELECT * FROM board_post bp JOIN board b on bp.board_no = b.board_no where  
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

module.exports = router;
