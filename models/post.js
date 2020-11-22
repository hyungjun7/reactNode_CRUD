const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            post_title: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            post_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            post_content: {
                type: Sequelize.STRING(3000),
                allowNull: false,
            },
            user_id: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            board_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            board_status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            }
            
        }, {
            //매개변수로 디비 커넥션을 넣음
            sequelize,
            //true 일 경우 생성일자와 업데이트 일자가 추가된다.
            timestamps: false,
            //카멜케이스에서 스네이크 케이스로
            underscored: true,
            //모델 이름 설정
            modelName: 'Post',
            //실제 테이블 이름
            tableName: 'post',
            //true로 설정 시 삭제일자 컬럼 추가된다.
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci' 
        });
    }
    //다른 모델과의 관계를 여기에
    //Cyclic dependency found "column" is dependent of itself다른 테이블과의 관계를 다시 한 번 생각해보자
    static associate(db) {
        db.Post.hasMany(db.Comment, {foreignKey: 'post_no', targetKey: 'id'});
        db.Post.hasMany(db.Image, {foreignKey: 'post_no', targetKey: 'id'});
        db.Post.belongsTo(db.Member, { foreignKey: 'user_id', targetKey: 'user_id'});
        db.Post.belongsTo(db.Board, {foreignKey: 'board_no', targetKey: 'id'});
    }
}