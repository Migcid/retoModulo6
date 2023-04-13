var procesador = require('./procesador.js'); 
var http = require('http'); 
var port = 8081;

http.createServer(function (req, res) {

    console.log(req.url)
    console.log(req.headers)
    console.log(req.method)
    procesador.get(req,res)


}).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);