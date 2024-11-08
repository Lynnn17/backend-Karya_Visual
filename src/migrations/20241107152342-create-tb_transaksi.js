"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tb_transaksi", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Order ID dari midtrans",
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Nama pelanggan",
      },
      transaction_status: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Status transaksi dari midtrans",
      },
      response_midtrans: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: "Respon lengkap dari midtrans dalam bentuk JSON",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tb_transaksi");
  },
};
