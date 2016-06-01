var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill', [ '.','scripts', 'components', 'index.js'].join(path.sep)
    ],
    resolve: {
        modulesDirectories: ['node_modules']
    },
    output: {
        path: [__dirname, 'build'].join(path.sep),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query:
      {
        presets:['es2015','react'],
        plugins: ['transform-runtime']
      }
        }]
    }
};
