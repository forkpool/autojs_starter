const fs=require('fs')
const path = require('path')
const {mkdirsSync} = require('./utils.js')
const resolve = p => path.resolve(__dirname, p)

function build2AutoJS(option={}){
    const srcDir=resolve("../src")
    const outDir=resolve("../dist/autojs")
    if (!fs.existsSync(outDir)) {
        mkdirsSync(outDir)
    }
    const groupFiles = fs.readdirSync(srcDir)
    for (let groutItem of groupFiles) {
        if (groutItem === 'libs') {
            continue
        }
        let funcDir=path.join(srcDir,groutItem)
        const funcFiles=fs.readdirSync(funcDir)
        for(let funcItem of funcFiles){
            try{
                let srcFilePath=path.join(srcDir,groutItem,funcItem,"main.js")
                let outFilePath=path.join(outDir,`${funcItem}.js`)
                let shellStr = fs.readFileSync(srcFilePath, 'utf8')
                fs.writeFileSync(outFilePath, shellStr, 'utf8')
            }catch (e){
                console.error(`AutoJS编译任务-脚本：${groutItem}\\${funcItem}出错，错误信息：`,e)
            }
        }
    }
}

function build2AutoBot(){
    const srcDir=resolve("../src")
    const outDir=resolve("../dist/autobot")
    if (!fs.existsSync(outDir)) {
        mkdirsSync(outDir)
    }
    const groupFiles = fs.readdirSync(srcDir)
    for (let groutItem of groupFiles) {
        if (groutItem === 'libs') {
            continue
        }
        let funcDir=path.join(srcDir,groutItem)
        const funcFiles=fs.readdirSync(funcDir)
        for(let funcItem of funcFiles){
            try{
                let outDirPath=path.join(outDir,groutItem,funcItem)
                if (!fs.existsSync(outDirPath)) {
                    mkdirsSync(outDirPath)
                }
                //处理main.js
                let srcFilePath=path.join(srcDir,groutItem,funcItem,"main.js")
                let outFilePath=path.join(outDirPath,`main.js`)
                let encShellStr = fs.readFileSync(srcFilePath, 'utf8')
                fs.writeFileSync(outFilePath, encShellStr, 'utf8')
                //处理app.json
                let srcAppJsonPath=path.join(srcDir,groutItem,funcItem,"app.json")
                let outAppJsonPath=path.join(outDirPath,`app.json`)
                let appJsonStr=fs.readFileSync(srcAppJsonPath, 'utf8')
                let appJson=JSON.parse(appJsonStr)
                appJson.encCode=false
                appJsonStr=JSON.stringify(appJson,null,4)
                fs.writeFileSync(outAppJsonPath, appJsonStr, 'utf8')
            }catch (e){
                console.error(`Autobot编译任务-脚本：${groutItem}\\${funcItem}出错，错误信息：`,e)
            }
        }
    }
}

module.exports = {
    build2AutoJS,
    build2AutoBot
}
