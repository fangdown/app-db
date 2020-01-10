import sequelize from '../../config/mysql';
import { Authors } from './author';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const AuthorsVideo = sequelize.define(
  't_author_video',
  {
    core_user_id: {
      type: Sequelize.BIGINT(20),
      field: 'core_user_id',
    },
    aweme_id: {
      type: Sequelize.STRING(30),
      field: 'aweme_id',
      primaryKey: true,
    },
    aweme_type: {
      type: Sequelize.INTEGER(11),
      field: 'aweme_type',
    },
    desc: {
      type: Sequelize.STRING(255),
      field: 'desc',
    },
    play_count: {
      type: Sequelize.INTEGER(11),
      field: 'play_count',
    },
    share_count: {
      type: Sequelize.INTEGER(11),
      field: 'share_count',
    },
    comment_count: {
      type: Sequelize.INTEGER(11),
      field: 'comment_count',
    },
    digg_count: {
      type: Sequelize.INTEGER(11),
      field: 'digg_count',
    },
    forward_count: {
      type: Sequelize.INTEGER(11),
      field: 'forward_count',
    },
    cover: {
      type: Sequelize.STRING(255),
      field: 'cover',
    },
    dynamic_cover: {
      type: Sequelize.STRING(255),
      field: 'dynamic_cover',
    },
    video_src: {
      type: Sequelize.TEXT,
      field: 'video_src',
    },
    duration: {
      type: Sequelize.INTEGER(11),
      field: 'duration',
    },
    vid: {
      type: Sequelize.STRING(50),
      field: 'vid',
    },
    height: {
      type: Sequelize.INTEGER(11),
      field: 'height',
    },
    width: {
      type: Sequelize.INTEGER(11),
      field: 'width',
    },
    create_time: {
      type: Sequelize.STRING(255),
      field: 'create_time',
    },
    statistics: {
      type: Sequelize.STRING(255),
      field: 'statistics',
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
AuthorsVideo.sync({ force: false });

AuthorsVideo.belongsTo(Authors, {
  as: 'user',
  foreignKey: 'core_user_id',
  targetKey: 'core_user_id',
});
// 添加新视频
export interface IAhthorVideo {
  core_user_id: number;
  aweme_id: string;
  aweme_type: number;
  desc: string;
  play_count: number;
  share_count: number;
  comment_count: number;
  digg_count: number;
  forward_count: number;
  cover: string;
  dynamic_cover: string;
  video_src: string;
  duration: number;
  vid: string;
  height: number;
  width: number;
  create_time: string;
  statistics: string;
}
// 向 t_author_video 表中插入数据
export const addAuthorVideoModel = (data: IAhthorVideo) => {
  return AuthorsVideo.create(data);
};

// 查询视频详情
export const findVideoByIdModel = (aweme_id: string) => {
  return AuthorsVideo.findOne({ where: { aweme_id } });
};

// 更新
export const updateAuthorVideoModel = (data: IAhthorVideo) => {
  const { aweme_id, ...rest } = data;
  console.log(`-----------更新--------${aweme_id}`);
  return AuthorsVideo.update(rest, { where: { aweme_id } });
};

// 查询所有视频
export const findAllVideosModel = (page: number, limit: number) => {
  return AuthorsVideo.findAndCountAll({
    attributes: { exclude: ['id', 'statistics'] },
    order: [['digg_count', 'DESC']],
    offset: page * limit,
    limit,
    include: [
      {
        // include关键字表示关联查询
        model: Authors, // 指定关联的model
        as: 'user', //由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['nick_name', 'avatar_uri'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      },
    ],
    raw: true, // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
  });
};
// 查询所有视频-原生
/*
 * @param page
 * @param limit
 */
export const findOriginListModel = (page: number, limit: number) => {
  return sequelize.query(
    `select a.core_user_id,digg_count, nick_name as 'user.nick_name',aweme_id,b.desc,cover,video_src,duration,avatar_uri as 'user.avatar_uri' from t_author_video a inner join t_author b on b.core_user_id = a.core_user_id where a.digg_count = (select max(digg_count) from t_author_video where core_user_id = a.core_user_id) order by a.digg_count desc  limit ${page *
      limit}, ${limit}`,
    { raw: true }
  );
};
export const findOriginListCountModel = () => {
  return AuthorsVideo.count({
    distinct: true,
    col: 'core_user_id',
  });
};

// 查询推荐视频
export const findRecommendModel = (aweme_id: string, page: number) => {
  return AuthorsVideo.findAndCountAll({
    attributes: { exclude: ['id', 'statistics'] },
    where: { aweme_id: { [Op.ne]: aweme_id } },
    order: [['create_time', 'DESC']],
    offset: page * 20,
    limit: 20,
    include: [
      {
        // include关键字表示关联查询
        model: Authors, // 指定关联的model
        as: 'user', //由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['nick_name', 'avatar_uri'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      },
    ],
    raw: true, // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
  });
};

// 查询用户其他视频
export const findUserLatestModel = (uid: string, aweme_id: string) => {
  return AuthorsVideo.findAndCountAll({
    attributes: { exclude: ['id', 'statistics'] },
    where: { core_user_id: uid, aweme_id: { [Op.ne]: aweme_id } },
    order: [['create_time', 'DESC']],
    offset: 0,
    limit: 20,
    include: [
      {
        // include关键字表示关联查询
        model: Authors, // 指定关联的model
        as: 'user', //由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['nick_name', 'avatar_uri'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
      },
    ],
    raw: true, // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
  });
};
