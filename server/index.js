var server = require('http').createServer();
var io = require('socket.io')(server);
var onlineuser = [];
var num = 0;
io.on('connection', function(socket){
    console.log("用户登陆");
    socket.on("login", function (msg) {
        console.log("接收到一个用户加入:"+msg.loginname);
        //判断这个用户是否存在
        socket.name = msg.loginname;
        var index = onlineuser.indexOf(msg.loginname);
        console.log("index:"+index);
        if(index == -1){
            num++;
            onlineuser.push(msg.loginname);
            socket.broadcast.emit("newslogin", {newuser:msg.loginname});
            io.sockets.emit("loginnum", {num:num,onlineuser:onlineuser});
        } else {
            console.log("existName:"+msg.loginname);
            socket.emit("existname",{existName:msg.loginname});
        }
        console.log("login:"+onlineuser);
    });
    socket.on("message", function (msg) {
        console.log("接收到一个消息:"+msg.my);
        //socket.broadcast.emit("news", {m:msg.my})
        io.sockets.emit("news", {namewho:msg.who,nametalk:msg.my});
    });
    socket.on("disconnect", function () {
        console.log("disconnect:");
        var isindex = onlineuser.indexOf(socket.name);
        console.log("isindex:"+isindex);
        if(isindex != -1){
            onlineuser.splice(isindex,1);
            num--;
            socket.broadcast.emit("logout", {logoutuser:socket.name,num:num,onlineuser:onlineuser});
        }
        console.log("disconnect:"+onlineuser);
    });
});
server.listen(4000);
