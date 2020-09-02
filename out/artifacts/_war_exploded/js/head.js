var now;


    $.ajax({
        url: "http://localhost:8080/b/front/user/getUserSession",
        type: "post",
        async:false,
        dataType: "json",
        success: function (data) {
            $("#userImageTextId").show();
            $("#loginTextId").hide();
            $("#registerTextId").hide();
            document.getElementById('showUserName').innerHTML=data["userName"];

            $("#getUid").val(data["uid"]);
            $("#uid").val(data["uid"]);
            if(data.avatar!=null&&data.avatar.trim()!=''){
                document.getElementById('avatar').src= "http://localhost:8080/b/front/user/showAvatar?uid="+data["uid"];
            }else{
                document.getElementById('avatar').src= "/f/images/user.jpeg";
            }
        },error:function (data) {
            $("#userImageTextId").hide();
            $("#loginTextId").show();
            $("#registerTextId").show();
        }
    });



function changeImg(){
    var codeImg = document.getElementById("codeImg");
    //count++;
    now = new Date();
    codeImg.src="http://localhost:8080/b/front/user/code?code="+now.getTime();
}

// 当用户名失去焦点时 的非空校验
$("#userCode").on('blur', function()
{
    if ($("#userCode").val().trim() == '')
    {
        $("#userCode").tooltip(
            {
                'title'     : '账号不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#userCode").parent().parent().addClass('has-error');
    }else
    {
        $("#userCode").parent().parent().removeClass('has-error');
    }
});

$("#password").blur(function()
{
    if ($("#password").val().trim()  == '')
    {
        $("#password").tooltip(
            {
                title : '密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#password").parent().parent().addClass('has-error');
    }else
    {
        $("#password").parent().parent().removeClass('has-error');
    }
});

//验证码输入是否正确
function checkCode(){
    $.ajax(
        {
            url:"http://localhost:8080/b/front/user/checkCode",
            type:"post",
            dataType:"text",
            success:function(data)
            {
                if(data!=$("#code").val())
                {
                    $("#code").tooltip(
                        {
                            title : "请输入正确的验证码",
                            placement : "top",
                            trigger : "manual"
                        }).tooltip("show");
                    $("#code").parent().parent().addClass("has-error");
                } else {
                    $("#code").parent().parent().removeClass("has-error");
                }
            }
        });
}
$("#code").on("blur", function()
{
    checkCode();
});

$("#loginSubmit").click(function() {
    checkCode();
    if ($("#userCode").val().trim() == '')
    {
        $("#userCode").tooltip(
            {
                'title'     : '账号不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#userCode").parent().parent().addClass('has-error');
    }else if ($("#password").val().trim()  == '')
    {
        $("#password").tooltip(
            {
                title : '密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#password").parent().parent().addClass('has-error');
    } else{
        $.ajax(
            {
                url:"http://localhost:8080/b/front/user/checkCode",
                type:"post",
                dataType:"text",
                success:function(data)
                {
                    if(data!=$("#code").val())
                    {
                        isCodeTrue = false;
                        $("#code").tooltip(
                            {
                                title : "请输入正确的验证码",
                                placement : "top",
                                trigger : "manual"
                            }).tooltip("show");
                        $("#code").parent().parent().addClass("has-error");
                    } else {
                        isCodeTrue = true;
                        $("#userCode").parent().parent().removeClass('has-error');
                        $("#password").parent().parent().removeClass('has-error');
                        $("#code").parent().parent().removeClass("has-error");
                        var formData = new FormData($('#frontLoginFormId')[0]);
                        $.ajax({
                            url: "http://localhost:8080/b/front/user/doLogin",
                            type: "post",
                            data:formData,
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            success: function (data) {
                                if(data!=null&data!=''){
                                    if(data["userStatus"]==2){
                                        alert("该账号已被封禁！")
                                    }else{
                                        alert("登录成功！");
                                        $("#loginModal").modal("hide")
                                        $("#loginTextId").hide();
                                        $("#registerTextId").hide();
                                        $("#userImageTextId").show();
                                        location.href="/f/front/main.jsp";
                                    }
                                }
                            },
                            error:function(data){
                                alert("账号或密码错误！");
                                $("#userCode").val(null);
                                $("#password").val(null);
                            }
                        });
                    }
                }
            });
    }
});

function logout(){
    $.ajax({
        url: "http://localhost:8080/b/front/user/logOut",
        type: "post",
        async:false,
        dataType: "text",
        success: function (data) {
            if(data==1){
                location.href="/f/front/main.jsp";
            }
        }
    });
}
$("#logOut").click(function() {
    logout();
});

$("#uName").on('blur', function()
{
    if ($("#uName").val().trim() == '')
    {
        $("#uName").tooltip(
            {
                'title'     : '姓名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uName").parent().parent().addClass('has-error');
    }else
    {
        $("#uName").parent().parent().removeClass('has-error');
    }
});

$("#uCode").on('blur', function()
{
    if ($("#uCode").val().trim() == '')
    {
        $("#uCode").tooltip(
            {
                'title'     : '账号不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uCode").parent().parent().addClass('has-error');
    }else
    {
        $("#uCode").parent().parent().removeClass('has-error');
    }
});

$("#uPass").blur(function()
{
    if ($("#uPass").val().trim()  == '')
    {
        $("#uPass").tooltip(
            {
                title : '密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#uPass").parent().parent().addClass('has-error');
    }else
    {
        $("#uPass").parent().parent().removeClass('has-error');
    }
});

var reg =/^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
$("#uPhone").blur(function()
{
    if ($("#uPhone").val().trim()  == '')
    {
        $("#uPhone").tooltip('destroy');
        $("#uPhone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#uPhone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#uPhone").val().trim()))) {

        $("#uPhone").tooltip('destroy');
        $("#uPhone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#uPhone").parent().parent().addClass('has-error');
    }else {
        $("#uPhone").parent().parent().removeClass('has-error');
    }
});
$("#uArs").blur(function()
{
    if ($("#uArs").val().trim()  == '')
    {
        $("#uArs").tooltip(
            {
                title : '地址不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#uArs").parent().parent().addClass('has-error');
    }else {
        $("#uArs").parent().parent().removeClass('has-error');
    }
});


$("#registerSubmit").click(function() {

        if ($("#uName").val().trim() == '') {
            $("#uName").tooltip(
                {
                    'title'     : '姓名不能为空',
                    'placement' : 'top',
                    'trigger'   : 'manual'
                }).tooltip('show');

            $("#uName").parent().parent().addClass('has-error');
        }else if ($("#uCode").val().trim() == '') {
            $("#uCode").tooltip(
                {
                    'title'     : '账号不能为空',
                    'placement' : 'top',
                    'trigger'   : 'manual'
                }).tooltip('show');

            $("#uCode").parent().parent().addClass('has-error');
        }else if ($("#uPass").val().trim()  == '') {
            $("#uPass").tooltip(
                {
                    title : '密码不能为空',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#uPass").parent().parent().addClass('has-error');
        }else  if ($("#uPhone").val().trim()  == '') {

            $("#uPhone").tooltip('destroy');
            $("#uPhone").tooltip(
                {
                    title: '手机号码不能为空',
                    placement: 'top',
                    trigger: 'manual'
                }).tooltip('show');

            $("#uPhone").parent().parent().addClass('has-error');
        }else if(!(reg.test($("#uPhone").val().trim()))){
            $("#uPhone").tooltip('destroy');
            $("#uPhone").tooltip(
                {
                    title : '手机号码格式错误',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#uPhone").parent().parent().addClass('has-error');
        }else if ($("#uArs").val().trim()  == '') {
            $("#uArs").tooltip(
                {
                    title : '地址不能为空',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#uArs").parent().parent().addClass('has-error');
        }else{
            $("#uName").parent().parent().removeClass('has-error');
            $("#uCode").parent().parent().removeClass('has-error');
            $("#uPass").parent().parent().removeClass('has-error');
            $("#uPhone").parent().parent().removeClass('has-error');
            $("#uArs").parent().parent().removeClass('has-error');

            var formData = new FormData($('#frontRegisterFormId')[0]);
            $.ajax({
                url: "http://localhost:8080/b/front/user/doRegister",
                    type: "post",
                    data:formData,
                    contentType: false,
                    processData: false,
                    dataType: "text",
                    success: function (data) {
                    if(data!=null&data!=''){
                        if(data == 1){
                            alert("注册成功！");
                            $("#registModal").modal("hide");
                            $("#loginModal").modal("show");
                        }else if(data == 0){
                            alert("该账号已被注册！");
                            $("#uCode").val(null);
                        }else if(data == 2){
                            alert("该手机号码已被注册！");
                            $("#uPhone").val(null);
                        }else{
                            alert("未知错误注册失败！");
                        }

                    }
                }
            });
        }
});
$("#bPwd").blur(function()
{
    if ($("#bPwd").val().trim()  == '')
    {
        $("#bPwd").tooltip(
            {
                title : '原密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#bPwd").parent().parent().addClass('has-error');
    }else
    {
        $("#bPwd").parent().parent().removeClass('has-error');
    }
});
$("#nPwd").blur(function()
{
    if ($("#nPwd").val().trim()  == '')
    {
        $("#nPwd").tooltip(
            {
                title : '新密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#nPwd").parent().parent().addClass('has-error');
    }else
    {
        $("#nPwd").parent().parent().removeClass('has-error');
    }
});
$("#rnPwd").blur(function()
{
    if ($("#rnPwd").val().trim()  == '')
    {
        $("#rnPwd").tooltip('destroy');
        $("#rnPwd").tooltip(
            {
                title : '再次输入密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#rnPwd").parent().parent().addClass('has-error');
    }else if($("#rnPwd").val().trim()  != $("#nPwd").val().trim()){
        $("#rnPwd").tooltip('destroy');
        $("#rnPwd").tooltip(
            {
                title : '新密码两次输入不一致',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');
        $("#rnPwd").parent().parent().addClass('has-error');
    }else{
        $("#rnPwd").parent().parent().removeClass('has-error');
    }
});
modPwd();
function modPwd(){
    $("#modPasswordSubmit").click(function() {
        if ($("#bPwd").val().trim()  == '')
        {
            $("#bPwd").tooltip(
                {
                    title : '原密码不能为空',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#bPwd").parent().parent().addClass('has-error');
        }else if ($("#nPwd").val().trim()  == '')
        {
            $("#nPwd").tooltip(
                {
                    title : '新密码不能为空',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#nPwd").parent().parent().addClass('has-error');
        }else if ($("#rnPwd").val().trim()  == '') {
            $("#rnPwd").tooltip('destroy');
            $("#rnPwd").tooltip(
                {
                    title : '再次输入密码不能为空',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');

            $("#rnPwd").parent().parent().addClass('has-error');
        }else if($("#rnPwd").val().trim()  != $("#nPwd").val().trim()){
            $("#rnPwd").tooltip('destroy');
            $("#rnPwd").tooltip(
                {
                    title : '新密码两次输入不一致',
                    placement :  'top',
                    trigger   :  'manual'
                }).tooltip('show');
            $("#rnPwd").parent().parent().addClass('has-error');
        }else {
            $("#bPwd").parent().parent().removeClass('has-error');
            $("#nPwd").parent().parent().removeClass('has-error');
            $("#rnPwd").parent().parent().removeClass('has-error');

            var formData = new FormData($('#frontModPasswordId')[0]);
            $.ajax({
                url: "http://localhost:8080/b/front/user/modPassword",
                type: "post",
                async:false,
                data:formData,
                contentType: false,
                processData: false,
                dataType: "text",
                success: function (data) {
                    if(data!=null&data!=''){
                        if(data == 1){
                            alert("修改成功！请重新登录！");
                            logout();
                        }else if(data == 0){
                            alert("原密码输入不正确！");
                            $("#bPwd").val(null);
                        }else{
                            alert("未知错误！修改失败！");
                        }

                    }
                }
            });
        }

    });
}


$('[data-toggle="tooltip"]').each(function()
{
    // 绑定事件:当tooltip显示之后触发
    $(this).on('shown.bs.tooltip', function()
    {
        var _this = this;

        setTimeout(function()
        {
            $(_this).tooltip('hide');  // 隐藏提示框
        }, 2000);
    })
});