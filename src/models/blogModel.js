"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      show: DataTypes.STRING,
      foto: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "tb_blog",
      modelName: "Blog",
      timestamps: true,
    }
  );
  return Blog;
};
