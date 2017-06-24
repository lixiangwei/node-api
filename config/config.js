'use strict';
var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: ''
    },
    rest_api:'',
    service:'',
    port: ,
    mongodb: {
      uri: '',
      username: '',
      password: '',
      poolSize: 5
    },
    ossConfig: {
      accessKeyId: '',
      accessKeySecret: '',
      bucketNameProd: '',
      bucketNameDev: '',
      prodCDNURL: '',
      devCDNURL: ''
    },
    sessionStore: {
      password: '',
      port: 6379,
      host: '1.1.1.13',
      db: 2
    },
    mysql: {
      username: '',
      password: '',
      port: ,
      host: '1.1.1.1',
      dbname: '',
      minConnections: 2,
      maxConnections: 5,
      maxIdleTime: 60000
    },
    uploadConfig:{
      localPath:'/datacenter/upload',
      picServHost:''
    }
  }

};
module.exports = config[env];