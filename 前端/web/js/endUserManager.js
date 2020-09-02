var nowc;
getPage();
function getPage() {
    var pages;
    var currentPage;
    var formData = new FormData($('#findUser')[0]);
    $.ajax({
        url: "http://localhost:8080/b/back/user/getCount",
        type: "post",
        data:formData,
        async: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
            if (data != null && data != "") {
                pages = data["totalPageCount"]
                currentPage = data["currentPageNo"];
            } else {
                pages = 1;
                currentPage=1;
            }
        }
    });

    var options =
        {
            bootstrapMajorVersion : 3,                        // bootstrap版本 (此项目中所有的页面都是用bootstrap 3画的)
            currentPage  : currentPage, //选择当前页
            totalPages : pages,
            aligment : "center",
            pageUrl  : function(type, page, current)
            {
                $("#currentPageNo").val(current);
                ajxs();
            }
        };

    $("#userPage").bootstrapPaginator(options);
}


function ajxs() {
    var formData = new FormData($('#findUser')[0]);
    $.ajax({
        url: "http://localhost:8080/b/back/user/findAll",
        type: "post",
        //async:false,
        data:formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
            var tableInfos = document.getElementById('tableInfo');

                var code = '<table class="table table-bordered table-hover" style=\'text-align: center;\'>';
                code += '<thead>\n' +
                    '<tr class="text-danger">' +
                    '<th class="text-center">序号</th>' +
                    '<th class="text-center">姓名</th>' +
                    '<th class="text-center">帐号</th>' +
                    '<th class="text-center">电话</th>' +
                    '<th class="text-center">地址</th>' +
                    '<th class="text-center">状态</th>' +
                    '<th class="text-center">操作</th>' +
                    '</tr>' +
                    '</thead>';
                for(var i=0;i<data.length;i++){
                    code += '<tbody id="tb"><tr>' +
                        '<td>'+data[i]["uid"]+'</td>' +
                        '<td>'+data[i]["userName"]+'</td>'+
                        '<td>'+data[i]["userCode"]+'</td>'+
                        '<td>'+data[i]["phone"]+'</td>'+
                        '<td>'+data[i]["userAddress"]+'</td>';
                    if(data[i]["userStatus"] == 1){
                        code +='<td>有效</td>'
                    }else if(data[i]["userStatus"] == 2){
                        code +='<td>无效</td>'
                    }
                    code += '<td class="text-center">'+
                        '<input type="button" id="modUser" uid="'+data[i]["uid"]+'" class="btn btn-warning btn-sm " value="修改">&nbsp;';

                    if(data[i]["userStatus"] == 1){
                        code +='<input type="button" id="modStatus" uid="'+data[i]["uid"]+'" class="btn btn-danger btn-sm doProTypeDisable" value="禁用">';
                    }else if(data[i]["userStatus"] == 2){
                        code +='<input type="button" id="modStatus" uid="'+data[i]["uid"]+'" class="btn btn-success btn-sm doProDisable" value="启用">';
                    }
                    code +='</td></tr>';
                }
                code+='</tbody></table>';
                tableInfos.innerHTML = code;
        },error:function (data) {
            document.getElementById('tableInfo').innerHTML='';
        }
    });
}

$("#doUserSearch").click(function () {
    getPage();
});

$(document).on("click", "#modStatus", function () {
    $.ajax({
        url: "http://localhost:8080/b/back/user/modStatus",
        type: "post",
        data: {
            uid: $(this).attr("uid")
        },
        dataType: "json",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    ajxs();
                }else{
                    alert("更新状态失败！")
                }
            }
        }
    });
});

$(document).on("click", "#modUser", function () {
    $("#myModal").modal("show");
    $.ajax({
        url: "http://localhost:8080/b/back/user/getUserByUid",
        type: "post",
        data: {
            uid: $(this).attr("uid")
        },
        dataType: "json",
        success: function (data) {
            if(data!=null&data!=''){
                $("#uid").val(data["uid"]);
                $("#uName").val(data["userName"]);
                $("#uPhone").val(data["phone"]);
                $("#uAddress").val(data["userAddress"]);
            }
        }
    });
});

$("#uName").on('blur', function()
{
    if ($("#uName").val().trim() == '')
    {
        $("#uName").tooltip(
            {
                'title'     : '用户姓名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uName").parent().parent().addClass('has-error');
    }else
    {
        $("#uName").parent().parent().removeClass('has-error');
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

$("#uAddress").on('blur', function()
{
    if ($("#uAddress").val().trim() == '')
    {
        $("#uAddress").tooltip(
            {
                'title'     : '用户地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uAddress").parent().parent().addClass('has-error');
    }else
    {
        $("#uAddress").parent().parent().removeClass('has-error');
    }
});

$("#modUsers").click(function(){
    if ($("#uName").val().trim() == '') {
        $("#uName").tooltip(
            {
                'title'     : '用户姓名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uName").parent().parent().addClass('has-error');
    }else if ($("#uPhone").val().trim()  == '')
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
    }else if ($("#uAddress").val().trim() == '') {
        $("#uAddress").tooltip(
            {
                'title'     : '用户地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#uAddress").parent().parent().addClass('has-error');
    }else{
        var formData = new FormData($('#modUserId')[0]);
        $("#uName").parent().parent().removeClass('has-error');
        $("#uPhone").parent().parent().removeClass('has-error');
        $("#uAddress").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/user/modUser",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==1){
                    $("#myModal").modal("hide");
                    alert("修改成功！")
                    $("#uName").val(null);
                    $("#uPhone").val(null);
                    $("#uAddress").val(null);
                    ajxs();
                }else if(data==0){
                    alert("修改失败！该手机号码已存在！");
                }else{
                    alert("修改失败!")
                }
            }
        });
    }
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


