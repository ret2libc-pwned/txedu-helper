/**
 * @author ret2libc-pwned
 * @description TXEduHelper V4主程序代码, 放在服务器端供调用
 */

const TXEDU_HELPER_VERSION = "4.2.0";
const ASCII_ART = `
####### #     # #######               #     #                                    
   #     #   #  #       #####  #    # #     # ###### #      #####  ###### #####  
   #      # #   #       #    # #    # #     # #      #      #    # #      #    # 
   #       #    #####   #    # #    # ####### #####  #      #    # #####  #    # 
   #      # #   #       #    # #    # #     # #      #      #####  #      #####  
   #     #   #  #       #    # #    # #     # #      #      #      #      #   #  
   #    #     # ####### #####   ####  #     # ###### ###### #      ###### #    # 
`;


//***相关配置***
const DEBUG_MODE = false;                //调试模式开关(暂时没啥用)
const SECURE_MODE = false;              //安全模式开关(开启后需要验证token)            
const VERIFY_TOKEN = 'y^e7k8BU3PtMYyHH@kVJR*k^^Zff&*Yk';    //安全模式的token
const MIRROR_NAME = 'Github Official (github@ret2libc)';           //镜像源名称
const QQ_GROUP = '902447358';                                              //群号

//检查access token
if(SECURE_MODE == true && (typeof(ACCESS_TOKEN) == "undefined" || ACCESS_TOKEN != VERIFY_TOKEN)) {
    alert("Error: 您正在使用非官方脚本, 请加群获取重试.\n对于开发人员, 请向作者索要token.\n(QQ群号已复制)");
    copy(QQ_GROUP);
    location.reload();
}

function about() {
    alert(
        "关于TXEduHelper\n" + LINE + "\n" +
        "加载器版本: " + LOADER_VERSION + "\n" +
        "云端脚本版本: " + TXEDU_HELPER_VERSION + "\n" +
        "云端脚本镜像源: " + MIRROR_NAME + "\n" +
        "作者: ret2libc-pwned@github\n" +
        "官方QQ群: " + QQ_GROUP + "\n" +
        "当前使用配置: " + config.name + "\n" +
        LINE 
    );
}

function sendMsg(str) {
    /**
     * @description 发送字符串到聊天区
     * @param str 要发送的字符串
     */
    var str;
    const bypass_delay = 5;   //修复腾讯课堂发送评论自动消失的问题, 即延迟10ms点击发送
    $editor.innerText = str + '\x00';		//bug fix: 修复空字符串无法发送的问题
    setTimeout("$sendBtn.click()", bypass_delay);
    LOG("在讨论区发送了一条信息: " + str);
}

function sendFlower() {
    //bug fix
    var speed = parseInt(config.autoFlowerRate);
    $flowerBtn.classList.remove("disabled");
    $flowerBtn.click();
    var i = 0;
    LOG("自动送花: 正在点击送花按钮...");
    for(i = 0; i < speed; i++) {
        //$flowerBtn.classList.remove("disabled");
        $flowerBtn.click();
    }
    LOG("自动送花: 执行了" + speed + "次送花");
}

function autoRespeak() {
    /*
     * @description 自动复述
     */

    alert("没做完.");
}

function showMenu() {
    let input = prompt("TXEduHelper功能菜单(输入数字进入对应功能页面)\n" + 
                        LINE + "\n" +
                        "1. 配置编辑器\n" +
                        "2. 查看当前配置信息\n" +
                        "3. 自定义发送消息(支持转义字符)\n" +
                        "4. 关于TXEduHelper\n" +
                        LINE + "\n");
    
    switch(input) {
        case "1":
            configEditor();
            break;
        case "2":
            showConfig();
            break;
        case "3":
            userFunc.say(prompt("请输入要发送的消息"));
            break;
        case "4":
            about();
            break;
        case "dbg":
            var cmd;
            while(cmd != "exit") {
                cmd = prompt("TXEduHelper Debug Prompt (Type exit to quit)");
                eval(cmd);
            }
            break;
        case null:
            return;
        default:
            showMenu();
    }
}

//定义页面元素(元素以$开头)
let $body = document.querySelector(".web");
let $editor = document.getElementsByClassName("ql-editor ql-blank")[0];
let $sendBtn = document.getElementsByClassName("im-btn text-editor-btn btn-default btn-s")[0];
let $flowerBtn = document.getElementsByClassName("toolbar-icon")[2];
var $signInBtn, $signInSubmitBtn, $choiceBtn, $choiceSubmitBtn, $choiceCloseBtn, $chatLs;
var chatCnt = new Map();
//let chatLs = document.getElementsByClassName("chat-item-msg-content js-chat-item-msg-content")
//chatLs[chatLs.length - 1].dataset.nickname
//显示按钮
let $title = document.createElement("a");
$title.href = 'javascript:showMenu()';    //***点击标题的动作***
$title.innerText = `TXEduHelper Core ${TXEDU_HELPER_VERSION}`;             //***标题文字***
$title.style = 'position:absolute;top:21px;left:600px;color:#33FF66;border-radius:10px;cursor:pointer;z-index:3000';    //***标题样式***
void($body.appendChild($title));

alert("该脚本不再更新, 请打开控制台获取更多信息!");
console.log(`%c警告: 该脚本不再更新！！！`, "color: #cc0000; background: #FFFFFF; font-size: 80px");
console.log("TXEduHelper: 如需继续使用请fork本项目, 在TXEduHelper.js中注释掉相关代码！！！");

console.log(ASCII_ART);
LOG("脚本云端主程序加载成功! 版本号: " + TXEDU_HELPER_VERSION);

let helper = setInterval(function() {
    //小助手脚本主体
    //签到答题功能
    $signInBtn = document.getElementsByClassName("s-btn--m")[0];
    if($signInBtn) {
        //这个巨大的if可以理解成有窗口弹了出来
        $signInSubmitBtn = document.getElementsByClassName("s-btn s-btn--primary s-btn--m")[0];
        if($signInBtn.innerText == "签到") {
            //检测到签到
            if(config.autoSignInEnabled) {
                $signInBtn.click();
                setTimeout("signInSubmitBtn.click()", 200); //点击确定
                LOG("自动签到: 签到成功! ");
            } else {
                LOG("自动签到: 老师发起了一次签到, 需要由用户操作.");
            }
        } else if($signInBtn.innerText == "确定") {
            //检测到选择题
            if(config.autoAnswerEnabled) {
                var whichBtn = config.defaultAnswer.charCodeAt() - 65;  //0-5分别对应ABCDEF
                if(whichBtn < 0 || whichBtn > 5) {
                    //输入非法自动设为A
                    whichBtn = 0;
                }
                $choiceBtn = document.getElementsByClassName("s-f-rc-item")[whichBtn];
                $choiceSubmitBtn = document.getElementsByClassName("s-btn s-btn--primary s-btn--m")[0];
                if($choiceBtn.className != "s-f-rc-item checked") {
                    $choiceBtn.click();
                }
                $choiceSubmitBtn.click();
                Sleep(200);
                //choiceCloseBtn = document.getElementsByClassName("icon-css icon-css-cross icon-css--m")[0];
                //choiceCloseBtn.click();     //关闭窗口
                LOG("自动答题: 选择题自动作答成功! 选项: " + config.defaultAnswer);
            } else {
                LOG("自动答题: 老师发起了一次选择题, 需要由用户操作.");
            }
        }
    }

    //送花功能
    if(config.autoFlowerEnabled == 'true') {
        sendFlower();
    }

    //***在这里添加你需要循环执行的功能***
}, parseInt(config.scanInternal));
