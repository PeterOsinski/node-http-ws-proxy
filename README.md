# node-http-ws-proxy
A node.js HTTP/Websocket proxy with ability to decode incoming Websocket binary data

This package gives you ability to look up the content of WebSocket frames. 

It works as a proxy between the client and the target server

Just set up the process like
```
node proxy.js
```
And then connect to it via `8000` port
You will see the contents of WebSocket frames proxied live

Why?
-----
The usual proxies are not able to show the real contents of WebSocket frames. 
This code uses decoding algorithm based on http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17#section-5
