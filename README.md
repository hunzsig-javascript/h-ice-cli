# h-ice-cli

[![NPM version](https://img.shields.io/npm/v/h-ice-cli.svg)](https://www.npmjs.com/package/h-ice-cli)
[![NPM downloads](http://img.shields.io/npm/dm/h-ice-cli.svg?style=flat-square)](http://npmjs.com/h-ice-cli)

#### Thank ice-script / alibaba.
#### With hunzsig's contribution and ice-script.

### please run:
    cnpm install h-ice-cli@latest --save-dev

### cmd
    ice dev -p 9235[port]
    ice build
    ice app

### buildConfig in package.json
##### hot : auto refresh browser [default true]
##### dropConsole : drop console [default true]
##### theme : support only @icedesign/skin [default null]
##### primaryTheme : webpackage->options->modifyVars
##### import : demand loading [default null]
##### appHtml : html template [default {"dev": "dev.html", "prod": "index.html","app": "app.html"}]
##### publicUrl : support react-router4 BrowserRouter [default {"dev": "/", "prod": "/","app": "./"}]
##### entry : entry like webpackage [default {"dev": "src/index.js", "prod": "src/dev.js","app": "src/app.js"}]
```
"buildConfig": {
  "hot": false,
  "dropConsole": true,
  "theme": "@icedesign/skin",
  "primaryTheme": {
     "primary-color": "#6699ff",
     "brand-primary": "green",
     "color-text-base":  "#333"
  },
  "appHtml": {
    "dev": "dev.html",
    "prod": "index.html",
    "app": "app.html"
  },
  "publicUrl": {
    "dev": "/",
    "prod": "/",
    "app": "./"
  },
  "entry": {
    "dev": "src/index.js",
    "prod": "src/index.js",
    "app": "src/app.js"
  },
  "import": [
    {
      "libraryName": "@icedesign/base",
      "style": true
    },
    {
      "libraryName": "antd",
      "style": true
    }
  ]
}
```

### proxyConfig in package.json
```
"proxyConfig": {
  "/api": {
    "enable": true,
    "target": "http://your address"
  },
  "/api2": {
    "enable": true,
    "target": "http://your address2"
  }
}
```

### copyConfig in package.json
##### copyConfig will copy files which hope into the dir-dist when run 'npm run build'
##### the public dir is auto copy to dist dir
```
"copyConfig": {
  "include": [],
  "except": []
}
```
