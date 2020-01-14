/**
 * 链接表
 */
const sequelize= require('./index').init()
const Sequelize = require('sequelize');
export const Links = sequelize.define(
  'links',
  {
    id: {
      type: Sequelize.BIGINT(20),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(255),
    },
    value: Sequelize.STRING(255),
    cate: Sequelize.BIGINT(4),
  },
  {
    freezeTableName: true,
  }
);

Links.sync({ force: false });

// 添加新用户
export interface ILinks {
  id?:string
  name:string;
  icon: string;
  order: string;
}
// 向表中插入数据
export const addLinksModel = async (data: ILinks) => {
  if(data.id){
    const res = await findLinksModel(data.id)
    if(res){
      return updateLinksModel(data)
    }
  }
  return Links.create(data);
};

// 查询主键id
export const findLinksModel = (id: string) => {
  return Links.findOne({ where: { id } });
};

// 更新
export const updateLinksModel = (data: ILinks) => {
  const { id, ...rest } = data;
  return Links.update(rest, { where: { id } });
};

// 列表
export const findLinksListModel = () => {
  return Links.findAndCountAll(
    {
      order: [['order', 'DESC']]
    }
  );
};
