/**
 * 公众号文章列表
 */
const sequelize= require('./index').init()
const Sequelize = require('sequelize');
export const GzhAuthorList = sequelize.define(
  'gzh_author_list',
  {
    id: {
      type: Sequelize.BIGINT(12),
      primaryKey: true,
      autoIncrement: true
    },
    gid: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
    },
    username: {
      type:Sequelize.STRING(50),
      primaryKey: true,
    },
    nickname: Sequelize.STRING(50),
    title: Sequelize.STRING(255),
    content_url: Sequelize.STRING(255),
    cover: Sequelize.STRING(255),
    digest: Sequelize.STRING(255),
    datetime: Sequelize.STRING(20),
    author:  Sequelize.STRING(50),
    content:  Sequelize.STRING(50)

  },
  {
    freezeTableName: true,
  }
);
GzhAuthorList.sync({ force: false });

// 添加新用户
export interface IGzhAuthorList {
  gid:string
  username:string;
  nickname:string;
  title: string;
  content_url: string;
  cover: string;
  digest: string;
  datetime: string;
  content: string;
  author: string;
}
// 向表中插入数据
export const addGzhAuthorArticleModel = async (data: IGzhAuthorList) => {
  // console.log('data', data)
  const res = await findGzhAuthorArticleModel(data.gid)
  if(res){
   return true
  }
  return GzhAuthorList.create(data);
  
};

// 查询文章
export const findGzhAuthorArticleModel = (gid: string) => {
  console.log('gid', gid)
  return GzhAuthorList.findOne({ where: { gid } });
};

// 更新
export const updateGzhAuthorArticleModel = (data: IGzhAuthorList) => {
  const { gid, ...rest } = data;
  return GzhAuthorList.update(rest, { where: { gid } });
};

// 根据用户名查询文章列表
export const findGzhAuthorMsgModel = (username:string) => {
  return GzhAuthorList.findAndCountAll({
    where: { username },
    order: [['datetime', 'DESC']]
  });
};
