var now;
function changeImg(){
    var codeImg = document.getElementById("codeImg");
    //count++;
    now = new Date();
    codeImg.src="http://localhost:8080/b/back/staff/code?code="+now.getTime();
}

// 当用户名失去焦点时 的非空校验
$("#username").on('blur', function()
{
    if ($("#username").val().trim() == '')
    {
        $("#username").tooltip(
            {
                'title'     : '用户名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#username").parent().parent().addClass('has-error');
    }else
    {
        $("#username").parent().parent().removeClass('has-error');
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

$("#state").blur(function()
{
    if ($("#state").val().trim()  == 0)
    {
        $("#state").tooltip(
            {
                title : '请选择身份',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#state").parent().parent().addClass('has-error');
    }else
    {
        $("#state").parent().parent().removeClass('has-error');
    }
});

//验证码输入是否正确
$("#code").on("blur", function()
{
    $.ajax(
        {
            url:"http://localhost:8080/b/back/staff/checkCode",
            type:"post",
            dataType:"text",
            success:function(data)
            {
                // 验证码不正确,初始化个框
                if(data!=$("#code").val())
                {
                    $("#code").tooltip(
                        {
                            title : "请输入正确的验证码",
                            placement : "top",// left/right/auto/buttom
                            trigger : "manual"// 手动触发
                        }).tooltip("show");// 显示
                    $("#code").parent().parent().addClass("has-error");
                } else {
                    $("#code").parent().parent().removeClass("has-error");
                }
            }
        });
});

$("#submit").click(function()
{

    if ($("#username").val().trim()  == '') {
        $("#username").tooltip(
            {
                'title'     : '用户名不能为空',
                'placement' : 'top',   // top|buttom|left|right|auto
                'trigger'   : 'manual'
            }).tooltip('show'); // (2)tooltip显示

        $("#username").parent().parent().addClass('has-error');

    }else{
        $("#username").parent().parent().removeClass('has-error');
    }

    if ($("#password").val().trim()  == '') {
        $("#password").tooltip(
            {
                title : '密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#password").parent().parent().addClass('has-error');

    }else{
        $("#password").parent().parent().removeClass('has-error');
    }

    if ($("#state").val().trim()  == 0) {
        $("#state").tooltip(
            {
                title : '请选择身份',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#state").parent().parent().addClass('has-error');

    }else {
        $("#state").parent().parent().removeClass('has-error');
    }
    if($("#codeDiv").css("display")!="none") {
        $.ajax(
            {
                    async:false,
                    url:"http://localhost:8080/b/back/staff/checkCode",
                    type:"post",
                    dataType:"text",
                    success:function(data)
                    {
                        // 这里判断输入的验证码和显示的验证码一不一致,一致提交表单,不一致就不能提交表单
                        if(data!=$("#code").val())
                        {
                            $("#code").tooltip({
                                title : "请输入正确的验证码",
                                placement : "top",// left/right/auto/buttom
                                trigger : "manual"// 手动触发
                            }).tooltip("show");// 显示
                            $("#s").html("");
                            $("#code").parent().parent().addClass("has-error");
                        }else {
                            $("#code").parent().parent().removeClass("has-error");
                            if($("#username").val()!=''&&$("#password").val()!=''&&$("#state").val()!=0){
                                var formData = new FormData($('#loginFrm')[0]);
                                $.ajax({
                                    url: "http://localhost:8080/b/back/staff/doLogin",
                                    type: "post",
                                    data: formData,
                                    contentType: false,
                                    processData: false,
                                    dataType: "json",
                                    success: function (data) {
                                        if (data != null && data != "") {

                                            var sid = data["sid"];
                                            var staffName = data["staffName"];
                                            var staffRole = data["staffRole"];
                                            var staffStatus = data["staffStatus"];
                                            if (staffStatus == 1) {
                                                if(staffRole == $("#state").val()){
                                                    alert("登录成功！");
                                                    if (staffRole == 1) {
                                                        location.href = "/f/backend/main.jsp";
                                                    } else if (staffRole == 2) {
                                                        location.href = "/f/backend/cmain.jsp";
                                                    }

                                                }else{
                                                    alert("用户角色错误！");
                                                    $("#state").val(0)
                                                }
                                            }else {
                                                alert("账号已被封禁！");
                                                $("#password").val(null);
                                                $("#username").val(null);
                                                $("#state").val(0)
                                            }
                                        }
                                    },error:function (data) {
                                        alert("用户名或密码输入错误！登录失败！");
                                        $("#password").val(null);
                                        $("#username").val(null);
                                        $("#state").val(0)
                                    }
                                });
                            }
                        }
                    }
            });
        }
});

// 当用户信息(用户名、密码、身份)校验通过  之后   2秒钟之后关闭提示框tooltip
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







