const { watch,series, parallel,src,dest } = require('gulp');
const del=require('del');
const {build2AutoJS,build2AutoBot}=require('./build/index')
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
function copyLibs2autobot(){
    return src('src/libs/**/*')
        .pipe(dest('dist/autobot/libs/'));
}
const autojs=series(copyLibs2autojs,function (cb) {
    build2AutoJS();
    cb()
})
const autobot=series(copyLibs2autobot,function (cb) {
    build2AutoBot();
    cb()
})

function publishAutoJS() {
    return src('dist/autojs/**/*')
        .pipe(dest(autojsPublisDir));
}

function publishAutoBot() {
    return src('dist/autobot/**/*')
        .pipe(dest(autojsPublisDir));
}

const dev=function() {
    watch('src/**/*', series(clean, autojs,publishAutoJS,autobot));
}

exports.clean = series(clean);
exports.build = series(clean, autojs,autobot);
exports.publish = series(clean, autojs,publishAutoJS,autobot);
exports.dev=series(dev)
