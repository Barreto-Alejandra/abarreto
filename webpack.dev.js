const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/, // Ignore changes in node_modules
        aggregateTimeout: 300, // Wait 300ms after the last change
        poll: 1000, // Polling interval of 1s
    },
});