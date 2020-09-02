$("#uploadAvatar").val(null);
var Cuid;
$.ajax({
    url: "http://localhost:8080/b/front/user/getUserSession",
    type: "post",
    dataType: "json",
    async:false,
    success: function (obj) {
        Cuid = obj["uid"];
        $("#iUid").val(Cuid);
        $("#aUid").val(Cuid);
        $("#lUid").val(Cuid);
    },error:function (obj) {
        alert("请先登录！");
        location.href="/f/front/main.jsp";
    }
});


showUser();
showLifePhoto();


function showUser(){
    $.ajax({
        url: "http://localhost:8080/b/front/user/getUserByUid",
        type: "post",
        async:false,
        data:{uid:Cuid},
        dataType: "json",
        success: function (data) {
            if(data!=null&data!=''){
                $("#userName").val(data["userName"]);
                $("#userCode").val(data["userCode"]);
                $("#phone").val(data["phone"]);
                $("#userAddress").val(data["userAddress"]);
                if(data["userName"]!=null){
                    document.getElementById('showImg').src= "http://localhost:8080/b/front/user/showAvatar?uid="+data["uid"];
                }else{
                    document.getElementById('showImg').src= "/f/images/add.png";
                }
                if(data["avatar"]!=null){
                    document.getElementById('showImg').src= "http://localhost:8080/b/front/user/showAvatar?uid="+data["uid"];
                }else{
                    document.getElementById('showImg').src= "/f/images/add.png";
                }

            }
        },
        error:function (data) {

        }
    });
}

function showLifePhoto(){
    $.ajax({
        url: "http://localhost:8080/b/front/user/getLifePhoto",
        type: "post",
        data: {uid: Cuid},
        dataType: "json",
        success: function (data) {
            var lpDiv = document.getElementById('lpDiv');
            var code='';
            for(var i=0;i<data.length;i++){
                code+= '<img id="showImgs" src=http://localhost:8080/b/front/user/showLifePhoto?pic='+data[i]["userPic"]+' class="togeImg" alt="" width="100" height="100">';
                code+='<button type="button" class="btn btn-warning margin-right-15" pic="'+data[i]["userPic"]+'" id="deleteLp">删除</button>';
            }
            lpDiv.innerHTML=code;
        },
        error:function (data) {

        }
    });
}






$("#userName").blur(function()
{
    if ($("#userName").val().trim()  == '')
    {
        $("#userName").tooltip(
            {
                title : '用户姓名不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#userName").parent().parent().addClass('has-error');
    }else
    {
        $("#userName").parent().parent().removeClass('has-error');
    }
});
var reg =/^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
$("#phone").blur(function()
{
    if ($("#phone").val().trim()  == '')
    {
        $("#phone").tooltip('destroy');
        $("#phone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#phone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#phone").val().trim()))) {

        $("#phone").tooltip('destroy');
        $("#phone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#phone").parent().parent().addClass('has-error');
    }else {
        $("#phone").parent().parent().removeClass('has-error');
    }
});

$("#userAddress").blur(function()
{
    if ($("#userAddress").val().trim()  == '')
    {
        $("#userAddress").tooltip(
            {
                title : '地址不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#userAddress").parent().parent().addClass('has-error');
    }else
    {
        $("#userAddress").parent().parent().removeClass('has-error');
    }
});

$("#modUserSubmit").click(function () {
    if ($("#userName").val().trim()  == '')
    {
        $("#userName").tooltip(
            {
                title : '用户姓名不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#userName").parent().parent().addClass('has-error');
    }else  if ($("#phone").val().trim()  == '') {

        $("#phone").tooltip('destroy');
        $("#phone").tooltip(
            {
                title: '手机号码不能为空',
                placement: 'top',
                trigger: 'manual'
            }).tooltip('show');

        $("#phone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#phone").val().trim()))){
        $("#phone").tooltip('destroy');
        $("#phone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#phone").parent().parent().addClass('has-error');
    }else if ($("#userAddress").val().trim()  == '') {
        $("#userAddress").tooltip(
            {
                title : '地址不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#userAddress").parent().parent().addClass('has-error');
    }else{
        $("#userName").parent().parent().removeClass('has-error');
        $("#phone").parent().parent().removeClass('has-error');
        $("#userAddress").parent().parent().removeClass('has-error');

        var formData = new FormData($('#frontModUserFormId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/front/user/modUserInfo",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            async:false,
            success: function (data) {
                if(data==1){
                    alert("修改成功！");
                    location.href="/f/front/center.jsp";
                }else if(data==0){
                    alert("手机号码已被占用！修改失败！");
                    $("#phone").val(null);
                }else{
                    alert("未知错误！修改失败！");
                }
            }
        });


    }
});
$("#modAvatarSubmit").click(function () {
        var formData = new FormData($('#modAvatarId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/front/user/uploadAvatar",
            type: "post",
            async:false,
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==0){
                    alert("图片上传为空！");
                }else if(data==1){
                    $("#uploadAvatar").val(null);
                    alert("上传成功！");
                    location.href="/f/front/center.jsp";
                }
            }
        });
});

$("#lifePhotoSubmit").click(function () {
    var formData = new FormData($('#lifePhotoId')[0]);
    $.ajax({
        url: "http://localhost:8080/b/front/user/uploadLp",
        type: "post",
        async:false,
        data:formData,
        contentType: false,
        processData: false,
        dataType: "text",
        success: function (data) {
            if(data==0){
                alert("图片上传为空！");
            }else if(data==1){
                $("#uploadLifePhoto").val(null);
                alert("上传成功！");
                location.href="/f/front/center.jsp";
            }
        }
    });
});

$(document).on("click", "#deleteLp", function () {
    $.ajax({
        url: "http://localhost:8080/b/front/user/deleteLp",
        type: "post",
        async:false,
        data: {
            pic: $(this).attr("pic")
        },
        dataType: "text",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    alert("删除成功！");
                    location.href="/f/front/center.jsp";
                }else{
                    alert("删除失败！")
                }
            }
        }
    });
});




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
