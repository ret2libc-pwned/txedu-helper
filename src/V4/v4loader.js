/**
 * @author ret2libc-pwned
 * @description TXEduHelperV4加载器, 用来加载脚本及依赖库以及读入配置
 */
const LOADER_VERSION = 4.0;
const ACCESS_TOKEN = 'y^e7k8BU3PtMYyHH@kVJR*k^^Zff&*Yk';                    //使用云脚本的token
const QQ_GROUP = '1145141919';                                              //群号
const COOKIE_PREFIX = "T_HELPER_";                                          //cookie前缀

//字符串宏
const N = "TXEduHelper";
const LINE = "-------------------------";

var loadSrc = 'https://hxc-cup.xyz/content/front-js/test.js';                      //要加载的js路径

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

    // //加载小助手js
    // let helperSrc = document.createElement('script'); 
    // helperSrc.src = loadSrc; 
    // helperSrc.type = 'text/javascript'; 
    // helperSrc.defer = true;
    // void(head.appendChild(helperSrc));
    LOG("依赖库加载成功! ");
}

loadJs();

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

function showConfig() {
    /**
     * @description 显示当前配置
     */
    alert(
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

function editConfig(str) {
    var str;
    config = JSON.parse(str);
    document.cookie = "T_HELPER_config=" + exportConfig();
    LOG("正在使用" + config.name + "配置");
}

function configEditor() {
    /**
     * @description 配置编辑器
     */
    var jsonCfg = prompt("请输入JSON格式的配置字符串");
    editConfig(jsonCfg);
    if(confirm("配置已写入, 点击确定查看配置! ")) {
        showConfig();
    }
}

function exportConfig() {
    /**
     * @description 导出json配置到字符串
     * 
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

//第一次加载
var isFirstLoad = getCookie("T_HELPER_isOldUser");
if(isFirstLoad == null) {
    //新用户
    alert("这好像是你第一次加载这个脚本, 不妨先配置一下吧...");
    configEditor();
    alert("配置已经完成了, 欢迎使用TXEduHelper!");
    document.cookie = "T_HELPER_isOldUser=no";
}

//自动使用cookie的配置
editConfig(getCookie("T_HELPER_config"));

