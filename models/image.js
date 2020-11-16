const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            post_no: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            image_url: {
                type: Sequelize.STRING(8000),
                allowNull: true,
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
        db.Image.hasMany(db.Post, {foreignKey: 'post_no', targetKey: 'id'});
    }
}