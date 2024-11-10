"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      nohp: DataTypes.STRING,
      alamat: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      foto: DataTypes.STRING,
      refresh_token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "tb_user",
      timestamps: true,
    }
  );

  return User;
};
