const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true
            },
            user_pw: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            user_email: {
                type: Sequelize.STRING(254),
                allowNull: false,
            },
            user_grant: {
                type: Sequelize.STRING(64),
                allowNull: false,
            },
            user_join_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
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
        db.Member.hasMany(db.Post, { foreignKey: 'user_id', sourceKey: 'user_id'});
        db.Member.hasMany(db.Comment, { foreignKey: 'user_id', sourceKey: 'user_id'});
    }

    //쿼리
    /**
     * INSERT 구문의 경우 시퀄라이즈 자료형에 기반하여 작성해야 한다.
     * INSERT INTO member ( ~ ) VALUES ( ~ ) -> Member.create({"key": value})
     * SELECT * FROM member; -> Member.findAll({});
     * SELECT COUNT(*) FROM member -> Member.FindOne({});
     * SELECT user_id FROM member -> Member.FindAll({attributes: ['key', value]})
     * 
     * 연산자 Op 모듈
     * Op.gt(초과), Op.gte(이상), .lt(미만), .lte(이하) .ne(같지 않음) .or .in(배열 요소 중 하나) .notIn 등
     * SELECT * FROM member WHERE user user_no < 10 or user_id = 'step'
     *  -> Member.findAll({where: {[Op.or] : [{user_no : [Op.lt] : 10}, [user_id: 'step']]}})
     * 
     * //정렬
     * SELECT * FROM member ORDER BY user_no DESC;
     *  -> Member.findAll({order: [['key', value]]})
     * 
     * //업데이트
     * UPDATE member SET user_id = 'step1' WHERE user_id = 'step';
     *  -> Member.update({'user_id', 'step1'}, {where: {user_id: 'step'}})
     * 
     * //삭제
     * DELETE FROM member WHERE user_no = 2 -> Member.destroy({where: {user_no: 2}})
     * 
     * //관계
     * SELECT * FROM board_post WHERE 
     */
};