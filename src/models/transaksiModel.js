"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
      // Define association here if needed
    }
  }

  Transaksi.init(
    {
      order_id: DataTypes.STRING,
      nama: DataTypes.STRING,
      transaction_status: DataTypes.STRING,
      response_midtrans: {
        type: DataTypes.TEXT("long"), // Long text data
        // Optional, based on your needs
      },
    },
    {
      sequelize,
      modelName: "Transaksi", // Correct model name
      tableName: "tb_transaksi",
      timestamps: true,
    }
  );

  return Transaksi; // Return the correct model
};
