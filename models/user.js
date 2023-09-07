'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    EMAIL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CREATEDAT: { // createdAt 컬럼
      type: DataTypes.DATE, // 예시 데이터 타입, 실제 타입에 맞게 변경하세요
      allowNull: false,
      defaultValue: DataTypes.NOW, // 현재 시간으로 기본값 설정
    },
    S3_URL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    STATUS: { // status 컬럼
      type: DataTypes.STRING,
      allowNull: false,
    },
    UPDATEDAT: { // updatedAt 컬럼
      type: DataTypes.DATE, // 예시 데이터 타입, 실제 타입에 맞게 변경하세요
      allowNull: false,
      defaultValue: DataTypes.NOW, // 현재 시간으로 기본값 설정
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false, // timestamps를 사용하지 않으려면 false로 설정
  });

  return User;
};
