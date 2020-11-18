const Sequelize = require('sequelize');
const Member = require('./member');
const Post = require('./post');
const Board = require('./board');
const Comment = require('./comment');
const Image = require('./image');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

//해당 방법으로 디비 객체를 불러와서 사용할 수 있다.
db.Post = Post;
db.Member = Member;
db.Board = Board;
db.Comment = Comment;
db.Image = Image;

Comment.init(sequelize);
Board.init(sequelize);
Member.init(sequelize);
Post.init(sequelize);
Image.init(sequelize);

Image.associate(db);
Comment.associate(db);
Board.associate(db);
Member.associate(db);
Post.associate(db);

module.exports = db;
