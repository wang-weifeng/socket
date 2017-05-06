var index = {};

index.init = function () {
   index.bindEvent();
};

index.bindEvent = function () {
    var socket=io.connect('http://wangweifeng.cooliszhu.com');
    $("#ok").on("click",function () {
        if($("#usernameInput").val() == ''){
            alert('请输入你的称呼');
            return;
        }
        var usernameInput = $("#usernameInput").val();
        socket.emit("login",{loginname:usernameInput});
        $("#nameHide").hide();
        $("#speackPage").show();
        $("#onlineName").text(usernameInput);
    });
    var newuser_html = '';
    socket.on("newslogin", function (data) {
        $("#onlinetx").show();
        console.log(data.newuser);
        $("#whoonline").text(data.newuser);
        setTimeout("$('#onlinetx').hide()",3000);
    });
    socket.on("existname", function (data) {
        console.log("existname:"+data.existName);
        //alert(data.existName+"已存在");
    });
    socket.on("logout", function (data) {
        var nowcy_list;
        $("#chenyuanlist").html('');
        $("#onxiaxian").show();
        console.log(data.logoutuser);
        $("#whoxiaxian").text(data.logoutuser);
        $("#onlineNum").text(data.num);
        $("#onlineNum").text(data.num);
        for(var item in data.onlineuser){
            nowcy_list = "<li> <a class='chat03_name'>"+data.onlineuser[item]+"</a> </li>";
            $("#chenyuanlist").append(nowcy_list);
        }
        setTimeout("$('#onxiaxian').hide()",3000);
    });
    socket.on("loginnum", function (data) {
        var cy_list;
        $("#chenyuanlist").html('');
        $("#onlineNum").text(data.num);
        for(var item in data.onlineuser){
            cy_list = "<li> <a class='chat03_name'>"+data.onlineuser[item]+"</a> </li>";
            $("#chenyuanlist").append(cy_list);
        }
    });
    $("#tj").on("click",function(){
        var yournametalk = $("#inputName").val();
        var whoname = $("#onlineName").text();
        socket.emit("message",{who:whoname,my:yournametalk});
        $("#inputName").val('');
    });
    var html_data;
    socket.on("news", function (data) {
        //html_data =  "<div class='message_box mes1' style='display: block;'>"+data.m+"</div>";
        html_data =  "<div class='sender'> <div style='padding: 10px 10px 10px 0px;'>"+ data.namewho +"说：</div> <div> <div class='left_triangle'></div> <span> "+data.nametalk+" </span> </div> </div>";
        $("#topic").append(html_data);
    });
    $("#onlineName").on("click",function () {
        $("#shuruName").show();
    });
};


$(function(){
    index.init();
});
