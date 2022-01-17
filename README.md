# TXEduHelper V4

使用方法: 复制[这个文件](https://ret2libc-pwned.github.io/txedu-helper/src/V4/v4loader.js)的所有代码, 在腾讯课堂上课页面打开开发者工具(按F12), 选择`Console`(控制台), 粘贴运行代码即可.

## 新功能
### 配置系统
只需轻轻一点, 就能更改JSON配置, 还能使用别人的配置.
每次加载脚本从cookie中直接读取配置, 无需每次设置.
```json
{
    "name": "Default",
    "autoAnswerEnabled": false,
    "defaultAnswer": "A",
    "autoSignInEnabled": true,
    "scanInternal": 5000,
    "autoFlowerEnabled": false,
    "autoRespeakEnabled": false,
    "autoRespeakTrigger": 3
}
```
### 代码大重构
从云端自动获取最新版本, 并切换到低延迟镜像源.
代码大重构, 体积更小, 性能更高.

### 插件
脚本功能模块化, 可自定义.
可以通过内置函数开发插件, 实现更多功能. 还可在脚本中调用或运行其他用户开发的插件.
```javascript
/**
 * @description 插件示例: 18点30分自动发送老师再见
 * @author ret2libc
 */

function auto886(hour, minute, msg) {
    /**
     * @description 插件功能, 在指定时间发送老师再见
     * 
     */
    var hour, minute, msg;
    var dat = new Date();
    if(dat.getHours() == hour && dat.getMinutes() == minute) {
        sendMsg(msg);
        TOAST("消息发送成功!");
    }
}

setInterval("auto886(18, 30, '下课了, 老师再见!\n来自TXEduHelper的消息')", config.scanInternal);
```

### 智能场景
脚本可以根据发言信息和当前时间做出动作, 模仿真实用户上课的行为, 脚本中送花与发送消息内容可以设置. 可以达到上课摸鱼不被发现的目的.:smirk:

## 特点
TXEduHelper**永久免费**! 希望给大家带来更好的上课体验!
