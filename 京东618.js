/**
 * 淘宝+京东双十一活动脚本
 * 支持淘宝\支付宝\京东任务自动执行
 *
 * Author: Hyue418
 * Date: 2020/10/21
 * Time: 21:16
 * Versions: 2.3.1
 * Github: https://github.com/hyue418
 */

try {
    auto();
    console.show();
} catch (error) {
    toast("请手动开启无障碍并授权给Auto.js");
    sleep(2000);
    exit();
}

//初始化参数
versions = 'V2.3.1';
speed = 0.75;
float = 1.25;
patNum = 0;
swipeTips = "滑啊滑啊滑啊滑ヽ(￣▽￣)ﾉ";
taskChooseList = ["淘宝赚喵币", "淘宝拍猫猫", "支付宝赚喵币", "京东全民营业", "调节脚本速度"];
speedChooseList = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3];
taobaoActivityData = "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index";
activityActivityData = "alipays://platformapi/startapp?appId=68687502";
width = device.width;
height = device.height;
setScreenMetrics(width, height);

// alert("【淘宝+京东双十一活动脚本 " + versions + "】", "脚本执行过程请勿手动点击按钮，否则脚本执行可能会错乱，导致任务失败\n\n执行淘宝任务时请确保使用低版本淘宝（V9.5及以下），否则无法获取奖励\n\n最新版脚本请到GitHub获取\nGitHub: https://github.com/hyue418\n\nPowered By Hyue418");
// 选择任务


// var taskList = ['签到', '去完成'];
var taskList = ['去完成'];

var backCompat = true;

runJd();

/**
 * 京东活动脚本
 */
function runJd() {
    var i = j = 0;
    // var activityButton = "浮层活动";
    // launch("com.jingdong.app.mall");
    // randomSleep(3000 * speed);
    // if (!descContains(activityButton).exists()) {
    //     alert("温馨提示", "首页没有找到入口浮层\n请手动打开活动页，进入后脚本会自动执行");
    // } else {
    //     clickContent(activityButton, "desc");
    //     log("正在打开【京东】活动页");
    //     randomSleep(300 * speed);
    //     //部分账号首页的活动浮层默认是收起状态，再次点击(有时候会点击失败，所以用while)
    //     while (descContains(activityButton).exists()) {
    //         clickContent(activityButton, "desc");
    //         randomSleep(300 * speed);
    //     }
    //     toastLog("若页面有弹窗，请手动关闭");
    //     randomSleep(3000 * speed + 1000);
    // }
    // className("android.view.View").text("做任务领金币").waitFor()
    // className("android.view.View").text("做任务领金币").findOne().click()
    // log("展开任务列表");
    // randomSleep(3000 * speed);
    // //未打开任务列表则再次尝试点击
    // while (!textContains("去完成").exists() && !textContains("已完成").exists()) {
    //     clickContent("做任务领金币");
    //     randomSleep(3000 * speed);
    // }
    j = 1;
    taskList.forEach(task => {
        while (textContains(task).exists()) {
            var button = text(task).findOnce(j);
            log(j + "");
            if (button == null) {
                break;
            }
            log("开始做第" + (i + 1) + "次任务");
            backCompat = true;
            switch (task) {
                case '签到':
                    jdClickButton(button);
                    log("签到成功");
                    i++;
                    randomSleep(1000 * speed);
                    break;
                case '去完成':

                    let index = button.indexInParent();
                    let children = button.parent().children();
                    let title = children.get(index - 2).text();
                    let info = children.get(index - 1).text();
                    log(title);
                    log(info);
                    if (title.indexOf("小程序") >= 0 ||
                        title.indexOf("商圈") >= 0 ||
                        title.indexOf("品牌会员") >= 0 ||
                        title.indexOf("加购") >= 0 ||
                        title.indexOf("怪兽") >= 0
                    ) {
                        log("跳过任务");
                        j++;
                        break;
                    }

                    var k = 0;
                    jdClickButton(button);
                    randomSleep(1500 * speed);

                    if (className("android.view.View").text("我知道了").exists()) {
                        text("我知道了").findOnce().click()
                    }

                    randomSleep(1000 * speed);
                    //若未点击成功，则再点击五次，仍未成功则跳过
                    while (textContains(task).exists() && k < 5) {
                        jdClickButton(button);
                        randomSleep(300 * speed);
                        k++;
                    }
                    if (k >= 5) {
                        log("跳过该任务");
                        j++;
                        break;
                    }

                    if(info.indexOf('得500金币')>-1){
                        back();
                        i++;
                        randomSleep(2000 * speed);
                        continue;
                    }

                    randomSleep(2000 * speed);

                    if (title.indexOf("领红包") >= 0) {
                        randomSleep(3000 * speed);
                    }


                    if (textContains("任意浏览").exists()) {
                        jdBrowsingOrShopping("浏览");
                        back();
                        randomSleep(500 * speed);
                        break;
                    } else if (textContains("加购").exists()) {
                        jdBrowsingOrShopping("加购");
                        back();
                        randomSleep(500 * speed);
                        break;
                    }

                    if (title.indexOf('互动精选好物') >= 0) {
                        log('hd');
                        back();
                        randomSleep(2000 * speed);
                        break;
                    }


                    if (textContains("宠汪汪").exists() || textContains("京喜财富岛").exists() || textContains("天天加速").exists()) {
                        randomSleep(10000 * speed);
                    }
                    descContains("获得").findOne(8000);
                    // waitFor("立即返回");
                    randomSleep(500 * speed);
                    i++;
                    if (textContains("京友圈").exists()) {
                        back();
                        randomSleep(500 * speed);
                    }
                    log("已完成");
                    back();
                    randomSleep(2000 * speed);
                    break;
                default:
                    log("跳过")
                    break;
            }
        }
    });

    if (backCompat) {
        backCompat = false;
        runJd();
        return
    }

    toastLog("【京东】任务已完成");
    log("=========================");
}

/**
 * 京东浏览/加购任务
 * @param taskName 任务名：浏览/加购
 */
function jdBrowsingOrShopping(taskName) {
    log("进入【" + taskName + "】任务");
    toastLog("日志窗口已隐藏");
    console.hide();
    randomSleep(200 * speed);
    for (i = 0; i < 6; i++) {
        if (i == 4) {
            toastLog(swipeTips);
            randomSwipe();
            randomSleep(500 * speed);
        }
        var price = textContains("¥").findOnce(i);
        var goods = price.parent().parent();
        var suffix = i == 5 ? "(容错)" : '';
        log(taskName + "第" + (i + 1) + "个商品" + suffix);
        if (taskName == "浏览") {
            jdClickButton(goods);
            randomSleep(1000 * speed);
            //若未点击成功，则再次点击
            while (textContains("任意浏览").exists()) {
                jdClickButton(goods);
                randomSleep(300 * speed);
            }
            randomSleep(3000 * speed);
            //商品页可能会有缺货弹窗，点掉
            if (textContains("取消").exists()) {
                clickContent("取消");
                randomSleep(500 * speed);
            }
            toastLog(swipeTips);
            randomSwipe();
            randomSleep(1000 * speed);
            back();
            randomSleep(1500 * speed);
        } else if (taskName == "加购") {
            var shopping = goods.child(goods.child(0).text() == "已加购" ? 5 : 4);
            click(shopping.bounds().centerX(), shopping.bounds().centerY());
            randomSleep(2500 * speed);
        }
    }
    console.show();
}

/**
 * 通过文字内容模拟点击按钮
 * @param content 按钮文字内容
 * @param type 点击类型，默认为text点击
 * @param sleepTime 等待时间，默认1000毫秒
 */
function clickContent(content, type, sleepTime) {
    var type = type || "text";
    var sleepTime = sleepTime || 1000;
    sleep(sleepTime * float * speed);
    if (type == "text") {
        var button = text(content).findOne();
    } else {
        var button = desc(content).findOne();
    }
    clickButton(button);
    return button;
}

/**
 * 根据控件的坐标范围随机模拟点击
 * @param button
 */
function clickButton(button) {
    var bounds = button.bounds();
    press(random(bounds.left, bounds.right), random(bounds.top + (bounds.bottom - bounds.top) / 4 * 3, bounds.bottom), random(50, 100));
}

/**
 * 根据控件的坐标范围随机模拟点击（京东用）
 * 京东任务按钮有圆角，通用的随机点击方法容易点出圆角外导致点击失效，此处做修正
 * @param button
 */
function jdClickButton(button) {
    var bounds = button.bounds();
    var width = bounds.right - bounds.left;
    var high = bounds.top - bounds.bottom;
    press(random(bounds.left + width / 4, bounds.right - width / 4), random(bounds.top + high / 3, bounds.bottom - high / 3), random(50, 100));
}

/**
 * 根据float倍数sleep随机时间
 * @param time
 */
function randomSleep(time) {
    sleep(ramdomByFloat(time));
}

/**
 * 随机滑动
 */
function randomSwipe() {
    smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), ramdomByFloat(800));
}

/**
 * 范围随机数生成
 * @param min
 * @param max
 */
function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 根据float生成随机数
 * @param number
 */
function ramdomByFloat(number) {
    return random(number, number * float);
}

/**
 * 仿真随机带曲线滑动
 * @param qx 起点x轴坐标
 * @param qy 起点y轴坐标
 * @param zx 终点x轴坐标
 * @param zy 终点y轴坐标
 * @param time 滑动时间，毫秒
 */
function smlMove(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};

function bezierCurves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};