
import sequelizeInit from '../../config/mysql-git123';
// 初始化数据库
let sequelize = ''
export const init = (options:Record<string, any>) => {
  const {dbname, username,password, host, port } = options
  sequelize= sequelizeInit({
    dbname,
    username,
    password,
    host,
    port
  })
}
export * from './gzh-author'
export * from './gzh-list'

export default sequelize
