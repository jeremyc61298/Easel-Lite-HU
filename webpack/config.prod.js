const path = require('path');
const merge = require('webpack-merge');

const base = require('./config.base');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist')
  },
});
