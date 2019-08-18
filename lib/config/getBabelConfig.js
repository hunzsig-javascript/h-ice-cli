const babelPluginImport = require('babel-plugin-import').default;
const colors = require('chalk');

/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */
module.exports = (buildConfig = {}) => {
  const buildImport = buildConfig.import || undefined;
  console.log(
    colors.blue('TIPS:'),
    '读取 package.json 里 buildConfig.import 按需加载配置（'+buildImport.length+'）项'
  );
  console.log(typeof buildImport);
  return {
    babelrc: buildConfig.babelrc || false,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: false,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
	  require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('babel-plugin-transform-es2015-object-super'),
      [
        require.resolve('babel-plugin-transform-runtime'),
        {
          helpers: false,
          polyfill: true,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
      [babelPluginImport, buildImport, "syntax-dynamic-import"],
    ],
  };
};
