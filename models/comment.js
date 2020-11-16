const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            post_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            comment_id: {
                type: Sequelize.STRING(128),
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            commnet_content: {
                type: Sequelize.STRING(1024),
                allowNull: false,
            },
            post_no: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            
        }, {
            //매개변수로 디비 커넥션을 넣음
            sequelize,
            //true 일 경우 생성일자와 업데이트 일자가 추가된다.
            timestamps: false,
            //카멜케이스에서 스네이크 케이스로
            underscored: true,
            //모델 이름 설정
            modelName: 'Member',
            //실제 테이블 이름
            tableName: 'member',
            //true로 설정 시 삭제일자 컬럼 추가된다.
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    //다른 모델과의 관계를 여기에
    static associate(db) {
        db.Comment.belongsTo(db.Member, { foreignKey: 'user_id', targetKey: 'user_id'});
        db.Comment.belongsTo(db.Post, {foreignKey: 'post_no', targetKey: 'id'});
    }
}