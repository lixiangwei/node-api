//service提供控制器需要的数据服务
'use strict';
//连接数据库
var mongoose = require('mongoose');
//访问编译后的数据模型，然后才能对数据库进行增删改查，使用mongoose.model会连接数据库
var Article = mongoose.model('ForumArticle');

//定义数据服务
exports.createArticle = function(article, callback) {
	//新的实例，也就是Document，文档是mongodb中数据的基本单元，类似关系型数据库数据表中的一行记录
	var article = new Article(article);
	//保存新的实例到数据库
	article.save(function(err, doc) {
		//失败
		if(err){
			return callback && callback(err);
		}
		//成功了
		return callback && callback(null, doc);
	});
};

exports.getArticle =  function(id, callback) {
	Article.findById(id, function(err, doc){
		if(err){
			return callback && callback(err);
		}
		return callback && callback(null, doc);
	});
};