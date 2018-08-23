const CONF = {
  env: 'dev',
  port: process.env.PORT || 5757,
  db: {
    client: process.env.DATABASE_URL ? 'pg' : 'mysql', 
    connection: process.env.DATABASE_URL || { 
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'data4upupming!',
      database: 'hitmers'
    },
    pool: {
      min: 0, max: 15
    },
    debug: this.env === 'dev' ? true : false
  },
  
  cdbName: 'checkModel',
  logindbName: 'loginModel',
  infodbName: 'infoModel',
  shiftsModel: 'shiftsModel'
};

module.exports = CONF;
