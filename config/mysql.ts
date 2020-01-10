const Sequelize = require('sequelize');
// 建立连接
const sequelize = new Sequelize('shortvideo', 'root', 'Fang@674123', {
  host: 'cdb-5gawn72i.bj.tencentcdb.com', // 数据库地址
  port: 10064,
  dialect: 'mysql', // 指定连接的数据库类型,
  define: {
    // 字段以下划线（_）来分割（默认是驼峰命名风格）
    underscored: true,
  },
  pool: {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  },
});
export default sequelize;
