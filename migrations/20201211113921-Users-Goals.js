'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Goals', 'userId', Sequelize.INTEGER);
    await queryInterface.addConstraint('Goals', { //테이블에 제약 조건 추가
      fields: ['userId'], // 칼럼명
      type: 'foreign key', // 외래키 지정
      name: 'FK_users_have_goals', // 이 이름이 다 달라야함.
      references: { // 대상 테이블, 열 이름을 지정하여 외래 키 제약 조건을 만드는 개체
        table: 'Users', // 참조하는 테이블
        field: 'id' // 참조 테이블의 참조할 Column
      },
      onDelete: 'cascade', // ??
      onUpdate: 'cascade' // ??
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Goals', 'FK_users_have_goals');
     // 칼럼 삭제
    await queryInterface.removeColumn('Goals', 'userId');
  }
};
