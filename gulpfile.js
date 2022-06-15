const { watch,series, parallel,src,dest } = require('gulp');
const del=require('del');
const {build2AutoJS}=require('./build/index')
const os =require("os")
const fs=require('fs')
const path = require('path')
const homeDir=os.homedir()
const autojsPublisDir=path.join(homeDir,"autojs")

function clean(cb) {
    del("dist/**/*").then(()=>{
        cb()
    })
}
function copyLibs2autojs(){
    return src('src/libs/**/*')
        .pipe(dest('dist/autojs/libs/'));
}

const autojs=series(copyLibs2autojs,function (cb) {
    build2AutoJS();
    cb()
})

function publishAutoJS() {
    return src('dist/autojs/**/*')
        .pipe(dest(autojsPublisDir));
}

const dev=function() {
    watch('src/**/*', series(clean, autojs,publishAutoJS));
}

exports.clean = series(clean);
exports.build = series(clean, autojs);
exports.publish = series(clean, autojs,publishAutoJS);
exports.dev=series(dev)