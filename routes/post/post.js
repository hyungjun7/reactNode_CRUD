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
router.patch('/:category', async (req, res, next) => {
    try {
        const {title, content, category} = req.body;
        await Post.update({
            post_title: title,
            post_content: content,
            where: {board_no: gu(category)},
        });
        res.status(204).send({status: 'ok'});
    } catch (error) {
        next(error);
    }
});

router.delete('/:category', async(req, res, next) => {
    try {
        await Post.destroy({
            where: {id: req.body.id}
        });

        res.send({status: 'ok'});
    } catch (error) {
        next(error);
    }
});

//테스트용
router.get('/test', async (req, res, next) => {
    const board = await Board.findAll({});
    res.send(board);
});

//게시판 분기 처리, SQL을 한 번 더 사용할까 생각도 했지만 함수로 구현하는 것이 적합할듯 하다
const gu = (category) => {
    let category_number = 0;
    switch(category) {
        case "nodejs": category_number = 1; break;
        case "java": category_number = 2; break;
        case "react": category_number = 3; break;
        case "spring": category_number = 6; break;
        case "js": category_number = 7; break;
        case "ts": category_number = 8; break;
        case "jsp": category_number = 9; break;
        case "gunpla": category_number = 10; break;
      case "photo": category_number = 11; break;
      case "trip": category_number = 12; break;
      case "etc": category_number = 13; break;
      case "database": category_number = 14; break;
    }
    return category_number;
}

module.exports = router;
