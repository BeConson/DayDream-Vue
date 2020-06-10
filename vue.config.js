module.exports = {

    //配置生产环境和开发环境下的URL
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    //生成的文件存放目录名
    outputDir: "DayDream",
    //存放生成的静态资源
    assetsDir: "static",
    //关闭文件哈希(控制缓存)
    filenameHashing: false,
    //不输出map文件(用于定位错误的)
    productionSourceMap: false,

    devServer: {
        host: "localhost",
        port: 8085,
        https: false,
        open: true,

        // http://localhost:8181
        proxy: {
            "/api": {
                target: "http://localhost:8181",// 要访问的接口域名
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //拦截所有请求,将有api标识的地方全部替换为target中的内容
                }
            }
        }
    }
}