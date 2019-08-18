// 读取需要编译的文件
'use strict';
const fs = require('fs');
const colors = require('chalk');
const path = require('path');

/**
 * 获取项目中符合 src/pages/xxxx/index.jsx 的文件
 *
 * @return {Object}           entry 的 kv 对象
 */

module.exports = function getEntry(cwd) {
  const appDirectory = fs.realpathSync(cwd);
  const packageFilePath = path.resolve(appDirectory, 'package.json');
  const packageData = require(packageFilePath);


  if (packageData) {
    let entry;

    if (packageData.buildConfig && packageData.buildConfig.entry) {
      if (packageData.buildConfig.entry[process.env.H_BUILD_TYPE]) {
        entry = packageData.buildConfig.entry[process.env.H_BUILD_TYPE];
      }
    }
    if (entry) {
      console.log(colors.blue('TIPS:'), 'package.json 存在 entry 配置：' + entry);
      return entry;
    }
  } else {
    if (process.env.H_BUILD_TYPE === 'app') {
      console.log(colors.blue('TIPS:'), 'build app 入口 src/app.js');
      return 'src/app.js';
    } else if (process.env.H_BUILD_TYPE === 'prod') {
      console.log(colors.blue('TIPS:'), 'build 入口 src/build.js');
      return 'src/build.js';
    } else if (process.env.H_BUILD_TYPE === 'dev') {
      console.log(colors.blue('TIPS:'), 'dev 入口 src/dev.js');
      return 'src/dev.js';
    }
  }

};
