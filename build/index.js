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
            }catch (e){console.log(e.stack)}
        }
    }
}

module.exports = {
    build2AutoJS
}