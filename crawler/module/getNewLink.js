var http = require("http");//映入HTTP模块
var url = "http://sports.sina.com.cn/nba/1.shtml";
var cheerio = require("cheerio");

function fn(callback) {
    http.get(url , function (res) {
        var html = "";
        res.setEncoding("utf-8");//设置返回编码

        res.on("data",function(chunk){
            html += chunk;
        });

        res.on("end",function(){
            var $ = cheerio.load(html);
            var urlArr = [];
            $("#right a").each(function () {
                urlArr.push(  $(this).attr("href"));
            });
            callback(urlArr);//执行回调函数
        });
    });
}

module.exports = fn;
