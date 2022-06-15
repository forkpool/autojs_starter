async function main() {
    const deviceId=getDeviceId()
    try{
        console.log("当前设备id："+deviceId)
        console.log("正在切换输入发")
        await switchInput(deviceId, 'com.android.autojs/.AdbIME')
        await timeout(1000)
        console.log("切换输入法成功")
        console.log("正在启动手机端服务")
        await _execAdbShell(deviceId, `shell "settings put secure enabled_accessibility_services com.android.autojs/com.android.autojs.AutoJSServices && settings put secure accessibility_enabled 1"`, false)
        console.log("启动手机端服务成功")
        console.log(`设备ID：${deviceId} 服务启动成功`)
    }catch (e) {
        console.log(`设备ID：${deviceId} 服务启动失败`)
        console.log(e.stack)
    }finally {
        exit()
    }
}
async function test() {
    console.log(getDeviceId())
    exit()
}
// test()
main()