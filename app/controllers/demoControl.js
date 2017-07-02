//定义app的控制器
'use strict';
//express 把node的http模块功能封装在一个简单易用的接口，同时拓展了web所需的一些功能。关系有点像原生js和jquery
var express = require('express'),
//定义路由，可以挂载中间件
    router = express.Router(),
//js的功能库
    _ = require('lodash'),

//引入需要的数据服务
var demoService = require('../service/demoService');

//返回router给app使用
module.exports = function(app) {
	//将下面定义的路由挂载到/admin/forum，也就是/admin/forum/article的时候，执行下面第一个
    app.use('/admin/forum', router);
};

//定义路由
router.post('/article', function(req, res, next) {
	var article = req.body;
	demoService.createArticle(article, function(err, result) {
		if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
	});
});

router.get('/article/:id', function(req, res, next) {
	demoService.getArticle(req.params.id, function(err, result) {
		if(err){
			res.json(err);
		}else {
			res.json(result);
		}
	});
});