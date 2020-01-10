/**
 * 签名服务
 */
import sequelize from '../../config/mysql';
const Sequelize = require('sequelize');
export const AuthorSign = sequelize.define(
  't_author_sign',
  {
    core_user_id: {
      type: Sequelize.BIGINT(20),
      field: 'core_user_id',
      primaryKey: true,
    },
    _signature: {
      type: Sequelize.STRING(50),
      field: '_signature',
    },
    dytk: {
      type: Sequelize.STRING(50),
      field: 'dytk',
    },
    device_index: {
      type: Sequelize.INTEGER(4),
      field: 'device_index',
    },
  },
  {
    freezeTableName: true,
  }
);

AuthorSign.sync({ force: false });

// 添加新用户
export interface IAuthorSign {
  core_user_id: string;
  _signature: string;
  dytk: string;
  device_index: number;
}
// 向表中插入数据
export const addAuthorSignModel = (data: IAuthorSign) => {
  return AuthorSign.create(data);
};

// 查询主键id
export const findAuthorSignModel = (core_user_id: string) => {
  return AuthorSign.findOne({ where: { core_user_id } });
};

// 更新
export const updateAuthorSignModel = (data: IAuthorSign) => {
  const { core_user_id, ...rest } = data;
  return AuthorSign.update(rest, { where: { core_user_id } });
};
