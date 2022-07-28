const {test}=require(__dirname+"/libs/index.js")
async function main() {
    //调用libs/index.js的公共代码
    test()
    //退出脚本
    exit()
}

main()
