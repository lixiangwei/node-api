'use strict';
var express = require('express');
var glob = require('glob');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var multiparty=require('connect-multiparty');
var cookieParser = require('cookie-parser');
var forumUser=require('../app/utils/user');
var redis = require('redis');
module.exports = function(app, config) {
  if (process.env.NODE_ENV === 'production') {
    app.use(logger('combined'));
  } else {
    app.use(logger('dev'));
  }
  app.use(bodyParser.json({limit:"20mb"}));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  // app.use(compress());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(multiparty());

  var client = redis.createClient(config.sessionStore.port,
   config.sessionStore.host,{auth_pass:config.sessionStore.password});

   global.redis = client;


  app.use(session({
        store: new redisStore({
            host:config.sessionStore.host,
            port:config.sessionStore.port,
            prefix:'hipp-session-',
            pass : config.sessionStore.password,
            ttl: 18000
        }),
        secret: 'ogoz1t5Zm91rAUeld64d5Wqli10g',
        name: 'JSESSIONID',
        cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge:17900000
        },
        resave: true,
        saveUninitialized: true
  }));

  //添加中间件以支持跨域调用
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, X-Client-Id, X-Client-Token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header('Access-Control-Max-Age', 7200);
    next();
  });

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function(controller) {
    require(controller)(app);
  });

  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

};
