"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("users", "tb_user");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("tb_user", "users");
  },
};
