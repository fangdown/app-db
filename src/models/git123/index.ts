
import sequelizeInit from '../../config/mysql-git123';
import * as config from 'fd-config';

const mysql = config.get('mysql-git123')  
// 初始化数据库
export const init = () => {
  const {dbname, username,password, host, port } = mysql
  const sequelize= sequelizeInit({
    dbname,
    username,
    password,
    host,
    port
  })
  return sequelize
}
export * from './gzh-author'
export * from './gzh-list'

