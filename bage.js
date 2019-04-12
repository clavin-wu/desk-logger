var http = require('http');
var querystring = require('querystring');
var http = require('http');
var url = require("url");
var arr = [];
//清空数组
window.clearResArr = function () {
    arr=[];
}
//req 请求信息   res返回信息
http.createServer(function (req, res) {
    //过滤favicon请求
    if (req.url === '/favicon.ico') {
        return
    }
    if (req.method === "GET") {
        let params = url.parse(req.url, true).query;
        arr.unshift(params);
        window.store.addLogData(arr)
        res.write(JSON.stringify(arr))
        res.end()
    } else {
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
                if (req.url==='/log') {
                    data = decodeURI(data);
                    var dataObject = querystring.parse(data);
                    arr.unshift(dataObject);
                    window.store.addLogData(arr)
                    res.write(JSON.stringify(arr));
                    res.end()
                }
        });
    }

}).listen(8000);
