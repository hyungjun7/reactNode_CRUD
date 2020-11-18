const passport = require('passport');
const local = require('./localStrategy');
const Member = require('../models/member');

module.exports = () => {
    //로그인 시 실행, 세션에 어떤 객체를 저장할지 선택함.
    //done 함수의 첫번째 메서드는 에러 발생시 사용된다.
    passport.serializeUser((member, done) => {
        done(null, member.user_id);
    });

    //여기서 유저 정보를 불러오고 그 다음에 serial에 id 값을 넘겨준다.
    passport.deserializeUser((user_id, done) => {
        Member.findOne({where: {user_id}})
          .then(member => done(null, member))
          .catch(err => done(err));
    });
}

local();