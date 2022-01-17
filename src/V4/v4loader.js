/**
 * @author ret2libc-pwned
 * @description TXEduHelperV4加载器, 用来加载脚本及依赖库以及读入配置
 */

//代码阅读须知: 如需自己部署代码, 使用"***"包起来的注释的变量都可以或必须更改. 没包起来的改了也没啥用
const LOADER_VERSION = "4.0.0";
const ACCESS_TOKEN = 'y^e7k8BU3PtMYyHH@kVJR*k^^Zff&*Yk';                   //使用云脚本的token
const QQ_GROUP = '902447358';                                              //群号
const COOKIE_PREFIX = "T_HELPER_";                                         //***cookie前缀***

//字符串宏
const N = "TXEduHelper";
const LINE = "-------------------------";

//***云脚本URL***
var loadSrc = 'https://ret2libc-pwned.github.io/txedu-helper/src/V4/TXEduHelperV4.js';                      //要加载的js路径

var config = {
    name: "Default",
    autoAnswerEnabled: false,
    defaultAnswer: 'A',
    autoSignInEnabled: true,
    scanInternal: 5000,
    autoFlowerEnabled: false,
    autoRespeakEnabled: false,
    autoRespeakTrigger: 3,
}

var logs = "";  //日志字符串


//函数定义部分
//日志及输出函数
function LOG(str) {
    /**
     * @description 输出一段日志, 并写入日志字符串logs
     * @param str 输出内容
     */
    let date = new Date;
    var tmp = "[TXEduHelper][" + date.toLocaleTimeString() + "] " + str;
    console.log(tmp);
    logs += (tmp + '\n');
}


//加载脚本
function loadJs() {
    /**
     * @description 加载js文件(加载mdui, katex, 小助手)
     * 
     * */
    head = document.getElementsByTagName('head').item(0);
    //加载mdui
    let mduiLink = document.createElement('link');
    mduiLink.rel = "stylesheet";
    mduiLink.href = "https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css";
    void(head.appendChild(mduiLink));
    let mduiSrc = document.createElement('script');
    mduiSrc.src = "https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js";
    void(head.appendChild(mduiSrc));
    LOG("依赖库加载成功! ");
    //加载小助手js
    let helperSrc = document.createElement('script'); 
    helperSrc.src = loadSrc; 
    helperSrc.type = 'text/javascript'; 
    helperSrc.defer = true;
    void(head.appendChild(helperSrc));
}

function Sleep(time) {
    /**
     * @description 仿C语言Sleep函数, 延迟一段时间
     * @param time 延迟的时间(ms)
     * @warning 空载程序, 会导致性能低下.
     */
    var time;
    const start = new Date().getTime();
    while (new Date().getTime() - start < time) {
        //do nothing...
    }
}


//配置系统相关函数
function showConfig() {
    /**
     * @description 显示当前配置
     */
    alert(
        "TXEduHelper配置系统\n" + 
        LINE + "\n" +
        "当前配置: " + config.name + "\n" +
        LINE + "\n" +
        "启用自动答题: " + config.autoAnswerEnabled + "\n" +
        "自动答题默认答案: " + config.defaultAnswer + "\n" +
        "启用自动签到: " + config.autoSignInEnabled + "\n" +
        "启用自动答题: " + config.autoAnswerEnabled + "\n" +
        "脚本扫描间隔(ms): " + config.scanInternal + "\n" +
        "启用自动送花: " + config.autoFlowerEnabled + "\n" +
        "启用自动复述: " + config.autoRespeakEnabled + "\n" + 
        "自动复述触发次数: " + config.autoRespeakTrigger + "\n" +
        LINE
    );
}

function writeConfigToCookie() {
    document.cookie = COOKIE_PREFIX + "config=" + exportConfig();
    LOG("已将" + config.name + "配置写入cookie.");
    LOG("正在使用" + config.name + "配置.");
}

function editConfig(str) {
    /**
     * @description 将json配置字符串str应用到config数组
     * @note 执行完此函数配置不会写入cookie, 需要调用writeConfigToCookie()
     */
    var str;
    config = JSON.parse(str);
}

function configEditor() {
    /**
     * @description 配置编辑器
     */
    if(confirm("欢迎使用配置编辑器! 点击确定进入配置向导, 点击取消进入JSON数据配置界面.")) {
        alert("向导模式说明: 对于只能开关的功能, true表示开启, false表示关闭");
        //在文本框中显示当前配置
        config.autoFlowerEnabled = prompt("是否启用自动送花? ", config.autoFlowerEnabled);
        config.autoAnswerEnabled = prompt("是否启用自动答题? ", config.autoAnswerEnabled);
        config.defaultAnswer = prompt("请输入自动答题默认选项", config.defaultAnswer);
        config.autoSignInEnabled = prompt("是否启用自动签到? ", config.autoSignInEnabled);
        config.autoRespeakEnabled = prompt("是否启用自动复述? (没做完)", config.autoRespeakEnabled);
        config.autoRespeakTrigger = prompt("请输入自动复述触发所需的次数(没做完)", config.autoRespeakTrigger);
        config.scanInternal = prompt("请输入脚本扫描页面的频率(ms)", config.scanInternal);
        config.name = prompt("配置完成. 给这个配置起个名吧!", config.name);
        writeConfigToCookie();
    } else {
        var jsonCfg = prompt("请输入JSON格式的配置字符串");
        if(jsonCfg == null) {
            //用户点击取消就不做更改.
            jsonCfg = exportConfig();
        }
        editConfig(jsonCfg);
        writeConfigToCookie();
    }

    if(confirm("配置已写入, 点击确定查看配置! ")) {
        showConfig();
    }
    
    alert("配置成功! 刷新页面后重新加载脚本配置才会生效.")
}

function exportConfig() {
    /**
     * @description 导出json配置到字符串
     * @example var str_config = exportConfig();
     */
    return JSON.stringify(config);
}


function getCookie(key){
    /**
     * @description 获取cookie中指定key的value
     * @param key
     * @note 使用正则表达式匹配
     */
    var arr, regex = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(regex)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

function deleteCookie(key) {
    /**
     * @description 删除指定key的cookie
     */
    //expires=Thu, 01 Jan 1970 00:00:00 GMT
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 * @description 加载行为
 */

loadJs();

//第一次加载
var isFirstLoad = getCookie(COOKIE_PREFIX + "isOldUser");
if(isFirstLoad == null) {
    //新用户
    alert("这好像是你第一次加载这个脚本, 不妨先配置一下吧...");
    configEditor();
    alert("配置已经完成了, 欢迎使用TXEduHelper!");
    document.cookie = COOKIE_PREFIX + "isOldUser=no";
}

//自动使用cookie的配置
var cookieConfig = getCookie(COOKIE_PREFIX + "config");
if(cookieConfig == null) {
    alert("Error: cookie中不存在配置文件. 点击确定对脚本进行配置.");
    configEditor();
} else {
    //如果cookie中有配置
    editConfig(cookieConfig);
}

