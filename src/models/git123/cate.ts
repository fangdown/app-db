/**
 * 分类
 */
const sequelize= require('./index').init()
const Sequelize = require('sequelize');
export const Cate = sequelize.define(
  'cate',
  {
    id: {
      type: Sequelize.BIGINT(4),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    icon: Sequelize.STRING(50),
    order: Sequelize.BIGINT(4),
  },
  {
    freezeTableName: true,
  }
);

Cate.sync({ force: false });

// 添加新用户
export interface ICate {
  id?:string
  name:string;
  icon: string;
  order: string;
}
// 向表中插入数据
export const addCateModel = async (data: ICate) => {
  if(data.id){
    const res = await findCateModel(data.id)
    if(res){
      return updateCateModel(data)
    }
  }
  return Cate.create(data);
};

// 查询主键id
export const findCateModel = (id: string) => {
  return Cate.findOne({ where: { id } });
};

// 更新
export const updateCateModel = (data: ICate) => {
  const { id, ...rest } = data;
  return Cate.update(rest, { where: { id } });
};

// 列表
export const findCateListModel = () => {
  return Cate.findAndCountAll(
    {
      order: [['order', 'DESC']]
    }
  );
};
