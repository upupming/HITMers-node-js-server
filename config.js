const CONF = {
  env: 'dev',
  port: 5757,
  db: process.env.JAWSDB_URL || 
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
