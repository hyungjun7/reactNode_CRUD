const express = require('express');
const Post = require('../../models/post');
const Board = require('../../models/board');
const gu = require('../../utils/utils');
const {isLoggedIn} = require('../middleware');

const router = express.Router();
//카테고리로 구분하는 라우터는 최대한 밑으로 뺀다
//라우터에는 라우팅하는 것만 구현될 수 있도록 하자 비지니스 로직과의 분리



//최근 글 불러오는 라우터
router.get('/recent', async (req, res, next) => {
    try {
        console.log(req.session.user_id);
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
            include: [{
               model: Board,
                attributes: ['board_name']
            }],
            where: {id: req.query.id}
        });
        res.send(view);
    } catch (error) {
        next(error);
    }
});

//게시글 숨김 처리
router.patch('/private', isLoggedIn, async (req, res, next) => {
    try {
        const {id} = req.body;
        await Post.update({
                board_status: 2},
            {where: {id: id},
            });
        res.send({status: 'ok'});
    } catch (error) {
        next(error);
    }
});

//카테고리 별로 게시글 가져오기 
router.get('/:category', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: Board,
                where: {
                    board_name: req.params.category,
                }
            }],
            where: {board_status: 1},
            order: [['post_date', 'DESC']]
        })
        res.send(posts);
    } catch (error){
        next(error);
    }
});

//글쓰기 라우터
router.post('/:category', async (req, res, next) => {
    try {
        let catnum = gu(req.body.category);
        console.log(req.session.user_id);
        await Post.create({
            user_id: req.session.user_id,
            post_title: req.body.title,
            post_content: req.body.content,
            board_no: catnum,
        });

        res.send({status: 'ok'})
    } catch (error) { 
        next(error)
    }
})

//게시글 수정하는 라우터
router.patch('/:category', isLoggedIn, async (req, res, next) => {
    try {
        const {title, content, id, category} = req.body;
        await Post.update({
            post_title: title,
            post_content: content,
            board_name: category
            },
            {where: {id: id},
        });
        res.send({status: 'ok'});
    } catch (error) {
        next(error);
    }
});



//기능만 있고 클라이어트 사이드에 버튼을 만들어 두지는 않았다.
// router.delete('/doirhjdofljhjkfdghk', isLoggedIn, async(req, res, next) => {
//     try {
//         await Post.destroy({
//             where: {id: req.body.id}
//         });
//         res.send({status: 'ok'});
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;
