const CONF = {
  env: 'dev',
  port: process.env.PORT || 5757,
  db: process.env.CLEARDB_DATABASE_URL || 
    {
      client: 'mysql', 
      connection: { 
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'data4upupming!',
        database: 'hitmers'
      },
      debug: this.env === 'dev' ? true : false
    },
  
  cdbName: 'checkModel',
  logindbName: 'loginModel',
  infodbName: 'infoModel',
  shiftsModel: 'shiftsModel'
};

module.exports = CONF;
