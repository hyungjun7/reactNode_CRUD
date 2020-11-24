const express = require('express');
const Post = require('../../models/post');
const Board = require('../../models/board');

const router = express.Router();

//최근 글 불러오는 라우터
router.get('/recent', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            where: {board_status: 1},
            order: [['id', 'DESC']]
        });
        res.send(posts);
    } catch (error) {
        next(error);
    }
});

//게시글 상세보기 이전글과 다음글 쿼리도 같이 날려야함
router.get('/view', async(req, res, next) => {
    try {
        const view = await Post.findOne({
            where: {id: req.query.id}
        });
        res.send(view);
    } catch (error) {
        next(error);
    }
})

//카테고리 별로 게시글 가져오기 
router.get('/:category', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: Board,
                where: {board_name: req.params.category}
                
            }],
            order: [['post_date', 'DESC']]
        })
        res.send(posts);
    } catch {
        next(error);
    }
});

//글쓰기 라우터
router.post('/:category', async (req, res, next) => {
    try {
        let catnum = gu(req.body.category);
        console.log(req.body.content);
        
        await Post.create({
            user_id: 'step7',
            post_title: req.body.title,
            post_content: req.body.content,
            board_no: catnum,
        });

        console.log('ㅇㅇㅇㅇ');
        res.send({status: 'ok'})
    } catch (error) { 
        next(error)
    }
})

//테스트용
router.get('/test', async (req, res, next) => {
    const board = await Board.findAll({});
    res.send(board);
});

//게시판 분기 처리, SQL을 한 번 더 사용할까 생각도 했지만 함수로 구현하는 것이 적합할듯 하다
const gu = (category) => {
    let str = 0;
    switch(category) {
        case "nodejs": str = 1; break;
        case "java": str = 2; break;
    }
    return str;
}

module.exports = router;