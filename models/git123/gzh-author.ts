/**
 * 公众号作者
 */
import sequelize from '../../config/mysql-git123';
const Sequelize = require('sequelize');
export const GzhAuthor = sequelize.define(
  'gzh_author',
  {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    nickname: Sequelize.STRING(50),
    signature: Sequelize.STRING(255),
    headimg: Sequelize.STRING(255)
  },
  {
    freezeTableName: true,
  }
);

GzhAuthor.sync({ force: false });

// 添加新用户
export interface IGzhAuthor {
  id?:string|number
  username:string;
  nickname: string;
  signature: string;
  headimg: string;
}
// 向表中插入数据
export const addGzhAuthorModel = async (data: IGzhAuthor) => {
  const res = await findGzhAuthorModel(data.username)
  if(res){
    return updateGzhAuthorModel(data)
  }
  return GzhAuthor.create(data);
};

// 查询主键id
export const findGzhAuthorModel = (username: string) => {
  return GzhAuthor.findOne({ where: { username } });
};

// 更新
export const updateGzhAuthorModel = (data: IGzhAuthor) => {
  const { username, ...rest } = data;
  return GzhAuthor.update(rest, { where: { username } });
};
