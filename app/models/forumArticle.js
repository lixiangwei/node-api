//定义app的数据模型
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//定义数据模型（模式）
var ForumArticleSchema = new Schema({
	status: {
		//该字段的数据类型
		type: Number,
		require: true,
		default: 1,
		index: true
	},
	is_delete: {
		type: Number,
		require: true,
		default: 0,
		index: true
	}

}, {
	//把上面定义的模型创建到这个集合里面，就像关系型数据库里的表
	'collection': 'pisns_forum_article'
});

//编译模型并导出
module.exports = mongoose.model('ForumArticle', ForumArticleSchema);