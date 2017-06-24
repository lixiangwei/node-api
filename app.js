var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  Sequelize = require('sequelize');

var app = express();

//链接数据库
var options = {
  db: {
    native_parser: true
  },
  server: {
    poolSize: config.mongodb.poolSize
  },
  user: config.mongodb.username,
  pass: config.mongodb.password
};
if (config.mongodb.hasOwnProperty('replset')) {
  options.replset = {
    rs_name: config.mongodb.replset
  };
}

var mongodb = mongoose.connect(config.mongodb.uri, options, function(err) {
  if (err) {
    console.log('error:' + err);
  }
});

//遍历数据模型定义
var mongoModels = glob.sync(config.root + '/app/models/*.js');
mongoModels.forEach(function(model) {
  require(model);
});


//设置全局mongodb的数据源
global.mongodb = mongodb;

require('./config/express')(app, config);
require('./config/cacheConfig');
app.listen(config.port);

//加入链接mysql功能模块
var mysql = config.mysql;
var sequelize = new Sequelize(mysql.dbname, mysql.username, mysql.password, {
    host: mysql.host,
    port: mysql.port,
    dialect: 'mysql',
    timezone:'+08:00',
    maxConcurrentQueries: 100,
    pool: {
        minConnections: mysql.minConnections,
        maxConnections: mysql.maxConnections,
        maxIdleTime: mysql.maxIdleTime

    }
});

global.sequelize = sequelize;