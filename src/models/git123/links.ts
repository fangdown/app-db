/**
 * 链接表
 */
const sequelize= require('./index').init()
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
  value: string;
  cate: string;
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
// 删除
export const deleteLinksModel = (ids:Array<any>) => {
  return Links.destroy({ where: { id: { [Op.in]: ids } } });
};
// 列表
export const findLinksListModel = (data:Record<string, any>) => {
  const {page = 0, limit= 30} = data
  return Links.findAndCountAll(
    {
      offset: page * limit,
      limit,
      order: [['updated_at', 'DESC']]
    }
  );
};
// 根据分类获取列表
export const findLinksListByCateModel = (data:Record<string, any>) => {
  const {page = 0, limit= 30, cate} = data
  return Links.findAndCountAll(
    {
      where:{ cate},
      offset: page * limit,
      limit,
      order: [['updated_at', 'DESC']]
    }
  );
};

// 首屏分组集合
export const findLinksHomeListModel = (limit:number = 50 ) => {
  return sequelize.query(
    `SELECT a.id,a.name,a.value,a.cate FROM links AS a
      LEFT JOIN links AS b ON a.cate = b.cate
    AND a.id < b.id
    GROUP BY a.cate,a.id
    HAVING count(1) < ${limit}
    ORDER BY a.cate ASC, a.id DESC`,
    { raw: true }
  );
};

