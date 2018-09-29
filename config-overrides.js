const { injectBabelPlugin } = require('react-app-rewired');
const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')
const rewireLess=require('react-app-rewire-less');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars:{
            "@primary-color":"#6c848d"
        }
    })(config,env);
    /*config = rewireWebpackBundleAnalyzer(config, env, {
        analyzerMode: 'static',
        reportFilename: 'report.html'
    })*/
    config.externals={
        echarts:'window.echarts',
    }
    return config;
};
