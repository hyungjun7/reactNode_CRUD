const express = require('express');
const Member = require('../models/member');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');
const passport = require('passport');

router.post('/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local', (authError, member, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!member) {
            return res.send(info);
        }
        return req.login(member, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            req.session.user_id = member.user_id;
            res.send({status: 'ok'});
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send({status: 'ok'});
})

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const {user_id, user_pw, user_email} = req.body;
    try{
        const idChk = await Member.findOne({where: {user_id: user_id}})
        if(idChk) {
            return res.send({status: '이미 사용중인 아이디입니다.'});
        }
        const hashedPassword = await bcrypt.hash(user_pw, 12);
        const member = await Member.create({
            user_id: user_id,
            user_pw: hashedPassword,
            user_email: user_email,
            user_grant: 2, 
        });
        console.log(member);
        res.send({status: 'ok'});
    } catch(error) {
        next(error);
    }
})

module.exports = router;