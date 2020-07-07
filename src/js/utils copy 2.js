function move(dom, target) {
    //要用定时器,先清定时器
    clearInterval(dom.timer);
    //每隔一段时间运动一段距离
    dom.timer = setInterval(function() {
        //1)获取元素当前位置
        var current = dom.offsetLeft;
        //2)设置速度
        var speed = target > current ? 5 : -5;
        //3)计算元素下一个位置
        var next = current + speed;
        //4)有条件的定位元素
        //如果元素距离当前位置不足一步,直接到位
        if (Math.abs(target - next) <= 5) {
            dom.style.left = target + "px";
            clearInterval(dom.timer);
        } else {
            dom.style.left = next + "px";
        }

    }, 1000 / 60)
}



function move1(dom, target, fn) {
    clearInterval(dom.timer)
    dom.timer = setInterval(function() {
        // 获取  元素当前的位置
        var current = dom.offsetLeft
            //设置速度
        var speed = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
            // 获取下一个元素的位置
        var next = current + speed
            //有条件的定位元素
        if (next == target) {
            dom.style.left = target + 'px'
            clearInterval(dom.timer)
            fn && fn()
        } else {
            dom.style.left = next + 'px'
        }

    }, 1000 / 60)

}


function move4(dom, json, fn) {
    //先清除定时器
    clearInterval(dom.timer)
    dom.timer = setInterval(function() {

        //定义一个变量 判断是否全部完成
        var flg = true
            //循环 json对象
        for (var attr in json) {
            //设置元素当前的位置信息
            var current = parseInt(getStyle(dom, attr))
                //设置速度
            var target = json[attr]
            var speed = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
                //计算元素下一步的位置
            var next = current + speed
                //有条件的定位
            if (target == next) {
                dom.style[attr] = target + 'px'

            } else {
                dom.style[attr] = next + 'px'
                flg = false
            }
            if (flg) {
                clearInterval(dom.timer)
                fn && fn()

            }
        }

    }, 1000 / 60)
}

function getStyle(dom, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(dom)[attr]
    } else {
        return dom.currentStyle[attr]
    }
}




function move5(dom, json, fn) {
    //要用定时器,先清定时器
    clearInterval(dom.timer)
        //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function() {
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for (var attr in json) {
            //attr.1 获取元素当前位置
            if (attr == "opacity") {
                var current = parseInt(getStyle(dom, 'opacity') * 100);
            } else {
                var current = parseInt(getStyle(dom, attr));
            }
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current > 0 ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
                //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if (next == target) {
                if (attr == "opacity") {
                    dom.style.opacity = target / 100;
                    dom.style.filter = 'alpha(opacity=' + target + ')';
                } else {
                    dom.style[attr] = target + "px";
                }
            } else {
                if (attr == "opacity") {
                    dom.style.opacity = next / 100;
                    dom.style.filter = 'alpha(opacity=' + next + ')';
                } else {
                    dom.style[attr] = next + "px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if (flag) {
            clearInterval(dom.timer);
            fn && fn();

        }


    }, 1000 / 60)
}


function animation(dom, json, fn) {
    //要用定时器,先清定时器
    clearInterval(dom.timer)
        //每隔一段时间,宽度和高度都变化一点
    dom.timer = setInterval(function() {
        //每次能进定时函数,说明上次没有全部到位,本次可以继续运动
        var flag = true;
        //遍历json,看里面有多少个属性名和属性值,就要运行几次
        for (var attr in json) {
            //attr.1 获取元素当前位置
            if (attr == "opacity") {
                var current = parseInt(getStyle(dom, 'opacity') * 100);
            } else if (attr == 'zIndex') {
                var current = json['zIndex']; //如果是zIndex,直接到位
            } else {
                var current = parseInt(getStyle(dom, attr));
            }
            //attr.2 设置速度
            var target = json[attr];
            var speed = target - current > 0 ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10)
                //attr.3 计算元素下一个位置
            var next = current + speed;
            //attr.4 有条件的定位:如果在此处判断,则有一个到位定时器就停止
            if (next == target) {
                if (attr == "opacity") {
                    dom.style.opacity = target / 100;
                    dom.style.filter = 'alpha(opacity=' + target + ')';
                } else if (attr == 'zIndex') {
                    dom.style.zIndex = target;
                } else {
                    dom.style[attr] = target + "px";
                }
            } else {
                if (attr == "opacity") {
                    dom.style.opacity = next / 100;
                    dom.style.filter = 'alpha(opacity=' + next + ')';
                } else {
                    dom.style[attr] = next + "px";
                }
                flag = false;
            }
        }

        //本次是当前定时间隔的结束位置                
        //思路:只要有一个没到就不能停止定时器,如果此时flag 是true,说明都到了
        if (flag) {
            clearInterval(dom.timer);
            fn && fn();

        }

    }, 1000 / 60)
}