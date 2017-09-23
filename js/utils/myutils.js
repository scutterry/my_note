/**
 * Created by scutterry on 16/4/21.
 * version 1.1
 * 修改日期方法，去掉 Date.prototype.format,
 * 改为 myutils.dateFormat(date, "yyyy:MM:dd")
 */

/**
 * 根据 name 获取 url query 的值
 * @param name GET url 里面的key
 * @returns {string}
 */
var myutils = function(){

};
myutils.hourExp = new RegExp(/h+/);
myutils.minExp = new RegExp(/m+/);
myutils.secExp = new RegExp(/s+/);
myutils.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
};

/**
 * 转化秒成为时间
 * 只支持 hh:mm:ss 三个格式，可以只有两个 mm:ss
 */
myutils.sec2TimeFormat = function(sec, format){
    if(sec < 0){
        sec = 0;
    }
    var h = Math.floor(sec / 3600);
    var t = sec - h * 3600;
    var min = Math.floor(t / 60);
    var s = t - min * 60;
    var res = "";
    if(myutils.hourExp.test(format)){
        if(h < 10){
            res = "0" + h;
        }else{
            res = h.toString();
        }
    }

    if(myutils.minExp.test(format)){
        if(res != ""){
            res += ":";
        }
        if(min < 10){
            res += "0" + min;
        }else{
            res += min;
        }
    }

    if(myutils.secExp.test(format)){
        if(res != ""){
            res += ":";
        }
        if(s < 10){
            res += "0" + s;
        }else{
            res += s;
        }
    }

    return res;
};

// 将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// myutils.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// myutils.dateFormat(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
//author: meizz
myutils.dateFormat = function(d, fmt){
      var o = {
        "M+" : d.getMonth()+1,                 //月份
        "d+" : d.getDate(),                    //日
        "h+" : d.getHours()%12 == 0 ? 12 : d.getHours()%12, //小时
        "H+" : d.getHours(), //小时
        "m+" : d.getMinutes(),                 //分
        "s+" : d.getSeconds(),                 //秒
        "q+" : Math.floor((d.getMonth()+3)/3), //季度
        "S"  : d.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};

/**
 * 获取特定月份最后一天
 * @param d 特定日期
 * return {number} 最后一天
 */
myutils.getLastDay = function(d){
    if(!d){
        return 0;
    }
    var d2 = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    //减去一天毫秒数
    var d3 = new Date(d2.getTime() - 86400000);//60 * 60 * 24 * 1000
    return d3.getDate();
}