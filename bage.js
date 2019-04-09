var http = require('http');
var querystring = require('querystring');
var http = require('http');
var url = require("url");
var { add } = require("./util.js");
var arr = [];
//req 请求信息   res返回信息
http.createServer(function (req, res) {
    // console.log('-----------------------------------------', Date.now());
    //过滤favicon请求
    if (req.url === '/favicon.ico') {
        return
    }
    if (req.method === "GET") {
        let params = url.parse(req.url, true).query;
        arr.push(params);
        add(1,arr);
        res.write(JSON.stringify(arr))
        res.end()
    } else {
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
                data = decodeURI(data);
                var dataObject = querystring.parse(data);
                arr.push(dataObject);
                add(1,arr);
                res.write(JSON.stringify(arr));
                res.end()
        });
    }

}).listen(3000);
//正常信息的log
