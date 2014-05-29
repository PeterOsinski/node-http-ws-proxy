var httpProxy = require('http-proxy');

var request = require('request');

var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:3000',
    ws: true
}).on('error', function() {
    console.log('ERROR')
});


var server = require('http').createServer(function(req, res) {

    proxy.web(req, res);

}).on('upgrade', function(req, socket, head) {

    socket.on('data', function(data) {

        try {
            console.log(JSON.parse(decodeWS(data)));

        } catch (error) {}

    });

    proxy.ws(req, socket, head);

}).listen(8000);

var decodeWS = function(data) {
    var dl = data[1] & 127;
    var ifm = 2;
    if (dl == 126) {
        ifm = 4;
    } else if (dl == 127) {
        ifm = 10;
    }
    var i = ifm + 4;
    var masks = data.slice(ifm, i);
    var index = 0;
    var output = "";
    var l = data.length;
    while (i < l) {
        output += String.fromCharCode(data[i++] ^ masks[index++ % 4]);
    }
    return output;

}