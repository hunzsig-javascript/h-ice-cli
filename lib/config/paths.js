const {realpathSync} = require('fs');
const {resolve} = require('path');
const url = require('url');

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
}

const getAppHtml = (appPackageJson) => {
  const appPackage = require(appPackageJson);
  if (appPackage.buildConfig && appPackage.buildConfig.appHtml) {
    const bp = appPackage.buildConfig.appHtml;
    if (bp[process.env.H_BUILD_TYPE]) {
      return 'public/' + bp[process.env.H_BUILD_TYPE];
    }
  }
  return 'public/' + process.env.H_BUILD_TYPE + '.html';
};

const getPublicUrl = (appPackageJson) => {
  const appPackage = require(appPackageJson);
  if (appPackage.buildConfig && (appPackage.buildConfig.publicURL || appPackage.buildConfig.publicUrl)) {
    const bp = appPackage.buildConfig.publicURL || appPackage.buildConfig.publicUrl;
    if (bp[process.env.H_BUILD_TYPE]) {
      return bp[process.env.H_BUILD_TYPE];
    }
  }
  return process.env.H_BUILD_TYPE === 'app' ? './' : '/';
};

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
}

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = publicUrl ? url.parse(publicUrl).pathname : '/';
  return ensureSlash(servedUrl, true);
}

module.exports = function getPaths(cwd) {
  const appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp(getAppHtml(resolveApp('package.json'))),
    appPackageJson: resolveApp('package.json'),
    appAbcJson: resolveApp('abc.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    selfNodeModules: resolveApp('self_modules'),
    sdkNodeModules: resolveSDK('../../node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    resolveApp,
    appDirectory,
  };
};
