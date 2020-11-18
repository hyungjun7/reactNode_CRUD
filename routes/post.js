const express = require('express');
const Post = require('../models/post');
const Board = require('../models/board');

const router = express.Router();

router.get('/recent', async (req, res, next) => {
    const posts = await Post.findAll({
        where: {board_status: 1},
        order: [['id', 'DESC']]
    })
    .then((data) => {
        res.send(data);
    })
    .catch(err => next(err));
});

router.get('/test', async (req, res, next) => {
    const board = await Board.findAll({});
    res.send(board);
});


module.exports = router;