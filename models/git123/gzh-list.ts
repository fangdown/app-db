/**
 * 公众号文章列表
 */
import sequelize from '../../config/mysql-git123';
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
  title: string;
  content_url: string;
  cover: string;
  digest: string;
  datetime: string;
  content: string;
  author: string;
}
// 向表中插入数据
export const addGzhAuthorListModel = async (data: IGzhAuthorList) => {
  // console.log('data', data)
  const res = await findGzhAuthorListModel(data.gid)
  if(res){
   return updateGzhAuthorListModel(data)
  }
  return GzhAuthorList.create(data);
  
};

// 查询主键id
export const findGzhAuthorListModel = (gid: string) => {
  console.log('gid', gid)
  return GzhAuthorList.findOne({ where: { gid } });
};

// 更新
export const updateGzhAuthorListModel = (data: IGzhAuthorList) => {
  const { gid, ...rest } = data;
  return GzhAuthorList.update(rest, { where: { gid } });
};
