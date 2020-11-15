const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require('cors');
const memberRouter = require('./routes/member');



dotenv.config();
//패스포트 설정
const app = express();
app.use(cors());
//로그 미들웨어 - 개발환경에서 dev, 배포시 combined
app.use(morgan("dev"));
//요청 처리해주는 미들웨어 - 요청의 본문을 해석하여 req.body 객체로 만들어준다.
//하지만 동영상, 이미지 데이터는 처리할 수 없으므로 multer를 이용하여 처리
app.use(bodyParser.json());
//raw, text 데이터 또한 처리할 수 있다.
//extended 는 내장모듈인 querystring, true인 경우 외부모듈 qs
app.use(bodyParser.urlencoded({ extended: true }));

//요청에 동봉된 쿠키를 req.cookie 객체로 만들어준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
//사용자가 위조하기 쉽기 때문에, 비밀 키를 붙여 만들어낸 서명을 쿠키 뒤에 붙인다.
//이렇게 만들어진 쿠키는 req.signedCookie 객체에 담긴다.
//해당 미들웨어는 쿠키를 만들기 위해 사용되는 미들웨어가 아니고
//쿠키를 만들기 위해서는 res.cookie 에서 만든다.
//세션 관리용 미들웨어 req.session 에 저장된다.
app.use(
  session({
    //요청이 왔을 때 수정사항이 없어도 새로 저장할지 결정
    resave: false,
    //세션에 저장할 내역이 없더라도 처음부터 세션을 생성 여부
    saveUninitialized: false,
    //cookie-parser와 동일하게 설정하는 것이 좋음
    secret: process.env.COOKIE_SECRET,
    //세션 쿠키 - 일반적인 쿠키 옵션을 사용할 수 있음 
    //배포시 secure는 https로 적용하여 true 설정
    cookie: {
      httponly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

app.use('/api/users', memberRouter);

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
