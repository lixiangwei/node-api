'use strict';
//http服务
var request = require('request');

module.exports = function (grunt) {
  // 显示执行消耗时间
  require('time-grunt')(grunt);
  // 自动从node_modules加载所需要的模块文件
  require('load-grunt-tasks')(grunt);

  //这个数字是推荐默认值
  var reloadPort = 35729, files;

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        //不启用子进程来运行watch
        spawn: false,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      }
    }
  });

  //配置grunt，这些文件是必须的，不存在就让任务失败
  grunt.config.requires('watch.js.files');
  //从grunt配置中获取文件
  files = grunt.config('watch.js.files');
  //获取源文件
  files = grunt.file.expand(files);

  //判断服务器是否重启好了
  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    //接下来任务是异步的，调用async通知Grunt等待执行的信号。done函数在这个任务完成时被调用
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          }
          else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop', 
    'watch'
  ]);
};
