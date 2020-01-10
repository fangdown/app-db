import sequelize from '../../config/mysql';

const Sequelize = require('sequelize');

const SystemConfig = sequelize.define(
  't_v_system_config',
  {
    key: {
      type: Sequelize.STRING(50),
      field: 'key',
    },
    value: {
      type: Sequelize.TEXT,
      field: 'value',
    },
    desc: {
      type: Sequelize.TEXT,
      field: 'desc',
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

SystemConfig.sync({ force: false });

// 查询所有视频
export const findVersionModel = (key: string) => {
  return SystemConfig.findOne({
    where: { key },
  });
};
