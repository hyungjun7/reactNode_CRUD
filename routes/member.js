const express = require('express');
const Member = require('../models/member');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

router.post('/login', async (req, res, next) => {
    try {
        const member = await Member.findOne({
            where: {user_id: req.body.user_id}
        });
        if(member) {
            const result = await bcrypt.compare(req.body.user_pw, member.user_pw);
            if(result) {
                req.session.user = req.body.user_id; 
                res.send({'status': 'ok'});
            } else {
                res.send({'status': '아이디 또는 비밀번호가 다릅니다.'});
            }
        } else {
            res.send({'status': '아이디 또는 비밀번호가 다릅니다.'});
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/join', async (req, res, next) => {
    try{
        console.log(req.body.user_id);
        const hashedPassword = await bcrypt.hash(req.body.user_pw, 12);
        const member = await Member.create({
            user_id: req.body.user_id,
            user_pw: hashedPassword,
            user_email: req.body.user_email,
            user_grant: 2, 
        });
        console.log(member);
        res.status(201).send({'status': 'ok'});
    } catch(error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;