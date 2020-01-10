import sequelize from '../../config/mysql';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
export const Authors = sequelize.define(
  't_author',
  {
    uniqueid: {
      type: Sequelize.STRING(50),
      field: 'uniqueid',
      primaryKey: true,
    },
    short_id: {
      type: Sequelize.BIGINT(20),
      field: 'short_id',
    },
    core_user_id: {
      type: Sequelize.BIGINT(20),
      field: 'core_user_id',
    },
    nick_name: {
      type: Sequelize.STRING(100),
      field: 'nick_name',
    },
    follower: {
      type: Sequelize.BIGINT(20),
      field: 'follower',
    },
    focus: {
      type: Sequelize.BIGINT(20),
      field: 'focus',
    },
    like: {
      type: Sequelize.BIGINT(20),
      field: 'like',
    },
    province: {
      type: Sequelize.STRING(100),
      field: 'province',
    },
    city: {
      type: Sequelize.STRING(100),
      field: 'city',
    },
    gender: {
      type: Sequelize.INTEGER(4),
      field: 'gender',
    },
    tags: {
      type: Sequelize.STRING(255),
      field: 'tags',
    },
    price_info: {
      type: Sequelize.STRING(20),
      field: 'price_info',
    },
    avatar_uri: {
      type: Sequelize.STRING(255),
      field: 'avatar_uri',
    },
    desc: {
      type: Sequelize.STRING(255),
      field: 'desc',
    },
    title: {
      type: Sequelize.STRING(255),
      field: 'title',
    },
  },
  {
    // 如果为 true 则表的名称和 model 相同，即 Author
    // 为 false MySQL创建的表名称会是复数 Authors
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true,
    timestamps: false,
  }
);

Authors.sync({ force: false });

// 添加新用户
export interface IAhthor {
  // id: string;
  uniqueid?: string;
  short_id?: string;
  core_user_id: string;
  nick_name?: string;
  follower?: number;
  focus?: number;
  like?: number;
  province?: string;
  city?: string;
  gender?: number;
  tags?: string;
  price_info?: string;
  avatar_uri?: string;
  desc?: string;
  title?: string;
}
// 向 t_author 表中插入数据
export const addAuthorModel = (data: IAhthor) => {
  return Authors.create(data);
};

// 查询主键id
export const findAuthorModel = (core_user_id: string) => {
  return Authors.findOne({ where: { core_user_id } });
};

// 查询城市
export const findAuthorByCityModel = (
  city: string,
  page: number,
  limit: number
) => {
  return Authors.findAndCountAll({
    where: { city, follower: { [Op.gt]: 2000 } },
    order: [['follower', 'DESC']],
    offset: page * limit,
    limit,
  });
};

// 查询城市为null
export const findNullByCityModel = (
  city: string,
  page: number,
  limit: number
) => {
  return Authors.findAndCountAll({
    where: { city, follower: null },
    order: [['follower', 'DESC']],
    offset: page * limit,
    limit,
  });
};

// 更新
export const updateAuthorModel = (data: IAhthor) => {
  const { core_user_id, ...rest } = data;
  return Authors.update(rest, { where: { core_user_id } });
};
