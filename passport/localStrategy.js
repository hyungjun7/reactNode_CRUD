const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Member = require('../models/member');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw',
    }, async (user_id, user_pw, done) => {
        try {
            const member = await Member.findOne({where: {user_id}});
            if(member) {
                //data and hash arguments required 해당 오류는 두번 째 매개변수가
                //해쉬된 데이터가 아닐 수도 있다.
                const result = await bcrypt.compare(user_pw, member.user_pw);
                if(result) {
                    done(null, member);
                } else {
                    done(null, false, {status: '아이디 또는 비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {status: '아이디 또는 비밀번호가 일치하지 않습니다.'});
            }
        } catch (error) {
            done(error);
        }
    }));
};