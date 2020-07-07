//在这里书写项目src的打包配置文件

/*

gulp里面方法
1 src()
    ==>用来找到你打包的文件
     ==>gulp.src('你要打包的文件路径')
     ==>返回值  : 就是一个二进制流,就可以继续调用gulp分方法

2 pipe()
   ==>用来帮你做事情的
     ==>pipe(你需要做的事)
     ==>返回值:就是一个二进制流,就可以继续调用gulp分方法
    
3 dest()
==>用来写入文件的
==>你要是把已经压缩的代码放在另外一个文件夹里面





*/
//导入gulp
var gulp = require('gulp');

//导入del
var del = require('del')
//导入css压缩的
const cssmin =require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
//导入html
const htmlmin = require('gulp-htmlmin')
//导入js压缩
const uglify =require('gulp-uglify')
const babel =require('gulp-babel')
//导入服务器
const webserver =require('gulp-webserver')
//书写关于lib的移动的规则
const libHandler =()=>{
    //我打算把src处理完以后  都放在dist文件夹下
    gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'))
    gulp.src('./src/lib/swiper/**')
    .pipe(gulp.dest('./dist/lib/swiper'))
}
//书写关于del的删除规则
const delHandler =()=>{
    return del(['./dist'])

}
//书写关于图片的移动规则

const imagesHandler=()=>{
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'))
}


//书写关于css压缩
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

//书写关于html压缩
const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        removeAttributeQuotes:true,//移除属性上的双引号
        removeComments:true,//移除注释
        collapseWhitespace:true,//移除所有空格,会变成一行代码
        minifyCSS:true,//把页面里面style标签里面的css样式也去空格
        minifyJS:true,//把页面里面script标签里面的js代码也去空格
        collapseBooleanAttributes:true//把值为布尔值的属性简写
    }))
    .pipe(gulp.dest('./dist/pages'))

}

//书写关于js压缩

  const jsHandler =()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())  //uglify不认识es6,一定要先转语法,再压缩
    .pipe(gulp.dest('./dist/js'))
  }

  //写完webserver的规则
  const webserverHandler = ()=>{
    return gulp.src('./dist')   //找到要作为服务器根目录的文件夹
    .pipe(webserver({
        port:8090,//端口号,0-6635之间,尽量不要用0-1023
        open:'./pages/index.html',//你默认打开的首页,路径从dist开始书写
        livereload:true,//热更新,就是当dist里面代码有变化的时候自动刷新浏览器
        proxies:[ //这个第三方模块还可以帮助我们配置代理
            //直接在使用webserver的时候添加一个配置项:   proxies:[]
            {
                source: '/abc', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            },
            {
                source: '/eee', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            }
        ]
    }))
}
// module.exports.default = libHandler;
// module.exports.del = delHandler
// module.exports.images=imagesHandler
// module.exports.css =cssHandler
// module.exports.html = htmlHandler
// module.exports.js = jsHandler

//书写自动监控任务
const watchHandler = ()=>{
    /*
        当我在src里面书写代码的时候,只要我修改我的代码,就会被gulp监听到,
        一旦监听到,就重新帮我删除以前的和压缩现在的,一旦压缩,dist文件夹里面内容就变化了
        变化了以后服务器就会热更新
    */
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/images/**',imagesHandler);
    gulp.watch('./src/lib/**',libHandler)
}

//最终优化
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler,imagesHandler,cssHandler,htmlHandler,jsHandler),
    webserverHandler,
    watchHandler
)
