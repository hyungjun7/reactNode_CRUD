exports.isLoggedIn = (req, res, next) => {
    //isAuthenticated() 는 패스포트를 거치면서 req 객체에 추가된다.
    //해당 유저가 로그인 중이면 req true
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const msg = encodeURIComponent('현재 접속 중인 유저입니다.');
        res.redirect(`/?error=${msg}`);
    }
};