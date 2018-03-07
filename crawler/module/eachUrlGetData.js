var data = require("./getNewLink");
var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");

function fn(callback) {
    data(function (dataArr) {
        dataArr.forEach(function (url,index) {
            http.get(url , function (res) {
                var html = "";
                res.setEncoding("utf-8");//设置返回编码

                res.on("data",function(chunk){
                    html += chunk;
                });

                res.on("end",function(){
                    var $ = cheerio.load(html);
                    if($("#artibody")[0]){
                        var con = $("#artibody").html();
                        fs.writeFile(`./public/news/${index}.html`,con,{flag:"a"},function (err) {
                            if(err){throw err};
                        });
                    }
                });
            }).on("error",function (e) {
                console.log('错误:'+e.message)
            });
        });
        callback(true);
    });
}
module.exports = fn;