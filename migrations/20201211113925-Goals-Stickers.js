'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Stickers', 'goalId', Sequelize.INTEGER);
    await queryInterface.addConstraint('Stickers', { //테이블에 제약 조건 추가
      fields: ['goalId'], // 칼럼명
      type: 'foreign key', // 외래키 지정
      name: 'FK_goals_have_stickers', // 이 이름이 다 달라야함.
      references: { // 대상 테이블, 열 이름을 지정하여 외래 키 제약 조건을 만드는 개체
        table: 'Goals', // 참조하는 테이블
        field: 'id' // 참조 테이블의 참조할 Column
      },
      onDelete: 'cascade', // ??
      onUpdate: 'cascade' // ??
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Stickers', 'FK_goals_have_stickers');
     // 칼럼 삭제
    await queryInterface.removeColumn('Stickers', 'goalId');
  }
};
