getPage();

$.ajax({
    url: "http://localhost:8080/b/back/staff/getDeptList",
    type: "post",
    async:false,
    dataType: "json",
    success: function (data) {
        if(data!=null&&data!=""){
            var deptNo = document.getElementById('deptNo');
            var man_dept = document.getElementById('man-dept');
            var ManDept = document.getElementById('ManDept');
            var code = '<option value="0">请选择</option>';
            for(var i=0;i<data.length;i++){
                code += '<option value="'+data[i]["did"]+'">'+data[i]["deptName"]+'</option>';
            }
            deptNo.innerHTML = code;
            man_dept.innerHTML = code;
            ManDept.innerHTML = code;
        }
    }

});

function getPage() {
    var pages;
    var currentPage;
    var formData = new FormData($('#findStaff')[0]);
    $.ajax({
        url: "http://localhost:8080/b/back/staff/getCount",
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

    $("#staffPage").bootstrapPaginator(options);
}

function ajxs() {
    var formData = new FormData($('#findStaff')[0]);
    $.ajax({
        url: "http://localhost:8080/b/back/staff/findAll",
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
                    '<th class="text-center">部门</th>' +
                    '<th class="text-center">状态</th>' +
                    '<th class="text-center">角色</th>' +
                    '<th class="text-center">操作</th>' +
                    '</tr>' +
                    '</thead>';
                for(var i=0;i<data.length;i++){
                    code += '<tbody id="tb"><tr>' +
                        '<td>'+data[i]["sid"]+'</td>' +
                        '<td>'+data[i]["staffName"]+'</td>'+
                        '<td>'+data[i]["staffCode"]+'</td>'+
                        '<td>'+data[i]["phone"]+'</td>'+
                        '<td>'+data[i]["address"]+'</td>'+
                        '<td>'+data[i]["deptName"]+'</td>';
                    if(data[i]["staffStatus"] == 1){
                        code +='<td>有效</td>'
                    }else if(data[i]["staffStatus"] == 2){
                        code +='<td>无效</td>'
                    }
                    if(data[i]["staffRole"] == 1){
                        code +='<td>超级管理员</td>';
                    }else if(data[i]["staffRole"] == 2){
                        code +='<td>普通管理员</td>';
                    }
                    code += '<td class="text-center">'+
                        '<input type="button" id="modStaff" sid="'+data[i]["sid"]+'" class="btn btn-warning btn-sm " value="修改">&nbsp;';

                    if(data[i]["staffStatus"] == 1){
                        code +='<input type="button" id="modStatus" sid="'+data[i]["sid"]+'" class="btn btn-danger btn-sm doProTypeDisable" value="禁用">';
                    }else if(data[i]["staffStatus"] == 2){
                        code +='<input type="button" id="modStatus" sid="'+data[i]["sid"]+'" class="btn btn-success btn-sm doProDisable" value="启用">';
                    }
                    code +='</td></tr>';
                }
                code+='</tbody></table>';
                tableInfos.innerHTML = code;
        },error:function(data){
            document.getElementById('tableInfo').innerHTML = '';
        }
    });
}

$("#doStaffSearch").click(function () {
    getPage();
});

$(document).on("click", "#modStatus", function () {
    $.ajax({
        url: "http://localhost:8080/b/back/staff/modStatus",
        type: "post",
        data: {
            sid: $(this).attr("sid")
        },
        dataType: "text",
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

$("#man-name").on('blur', function()
{
    if ($("#man-name").val().trim() == '')
    {
        $("#man-name").tooltip(
            {
                'title'     : '员工姓名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-name").parent().parent().addClass('has-error');
    }else
    {
        $("#man-name").parent().parent().removeClass('has-error');
    }
});

$("#ManName").on('blur', function()
{
    if ($("#ManName").val().trim() == '')
    {
        $("#ManName").tooltip(
            {
                'title'     : '员工姓名不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManName").parent().parent().addClass('has-error');
    }else
    {
        $("#ManName").parent().parent().removeClass('has-error');
    }
});

$("#man-code").on('blur', function()
{
    if ($("#man-code").val().trim() == '')
    {
        $("#man-code").tooltip(
            {
                'title'     : '员工账户不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-code").parent().parent().addClass('has-error');
    }else
    {
        $("#man-code").parent().parent().removeClass('has-error');
    }
});

$("#man-password").on('blur', function()
{
    if ($("#man-password").val().trim() == '')
    {
        $("#man-password").tooltip(
            {
                'title'     : '员工密码不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-password").parent().parent().addClass('has-error');
    }else
    {
        $("#man-password").parent().parent().removeClass('has-error');
    }
});

var reg =/^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;
$("#man-phone").blur(function()
{
    if ($("#man-phone").val().trim()  == '')
    {
        $("#man-phone").tooltip('destroy');
        $("#man-phone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-phone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#man-phone").val().trim()))) {

        $("#man-phone").tooltip('destroy');
        $("#man-phone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-phone").parent().parent().addClass('has-error');
    }else {
        $("#man-phone").parent().parent().removeClass('has-error');
    }
});

$("#ManPhone").blur(function()
{
    if ($("#ManPhone").val().trim()  == '')
    {
        $("#ManPhone").tooltip('destroy');
        $("#ManPhone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#ManPhone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#ManPhone").val().trim()))) {

        $("#ManPhone").tooltip('destroy');
        $("#ManPhone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#ManPhone").parent().parent().addClass('has-error');
    }else {
        $("#ManPhone").parent().parent().removeClass('has-error');
    }
});

$("#man-address").on('blur', function()
{
    if ($("#man-address").val().trim() == '')
    {
        $("#man-address").tooltip(
            {
                'title'     : '员工联系地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-address").parent().parent().addClass('has-error');
    }else
    {
        $("#man-address").parent().parent().removeClass('has-error');
    }
});

$("#ManAddress").on('blur', function()
{
    if ($("#ManAddress").val().trim() == '')
    {
        $("#ManAddress").tooltip(
            {
                'title'     : '员工联系地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManAddress").parent().parent().addClass('has-error');
    }else
    {
        $("#ManAddress").parent().parent().removeClass('has-error');
    }
});

$("#man-dept").on('blur', function()
{
    if ($("#man-dept").val().trim() == 0)
    {
        $("#man-dept").tooltip(
            {
                'title'     : '员工所属部门不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-dept").parent().parent().addClass('has-error');
    }else
    {
        $("#man-dept").parent().parent().removeClass('has-error');
    }
});

$("#ManDept").on('blur', function()
{
    if ($("#ManDept").val().trim() == 0)
    {
        $("#ManDept").tooltip(
            {
                'title'     : '员工所属部门不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManDept").parent().parent().addClass('has-error');
    }else
    {
        $("#ManDept").parent().parent().removeClass('has-error');
    }
});

$("#man-role").on('blur', function()
{
    if ($("#man-role").val().trim() == 0)
    {
        $("#man-role").tooltip(
            {
                'title'     : '员工角色不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-role").parent().parent().addClass('has-error');
    }else
    {
        $("#man-role").parent().parent().removeClass('has-error');
    }
});

$("#ManRole").on('blur', function()
{
    if ($("#ManRole").val().trim() == 0)
    {
        $("#ManRole").tooltip(
            {
                'title'     : '员工角色不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManRole").parent().parent().addClass('has-error');
    }else
    {
        $("#ManRole").parent().parent().removeClass('has-error');
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

$("#addStaffs").click(function () {
    if ($("#man-name").val().trim()  == '') {
        $("#man-name").tooltip(
            {
                title : '员工姓名不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-name").parent().parent().addClass('has-error');
    }else if ($("#man-code").val().trim() == '')
    {
        $("#man-code").tooltip(
            {
                'title'     : '员工账户不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-code").parent().parent().addClass('has-error');
    }else if ($("#man-password").val().trim()  == '') {
        $("#man-password").tooltip(
            {
                title : '员工密码不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-password").parent().parent().addClass('has-error');
    } else if ($("#man-phone").val().trim()  == '') {
        $("#man-phone").tooltip('destroy');
        $("#man-phone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-phone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#man-phone").val().trim()))) {

        $("#man-phone").tooltip('destroy');
        $("#man-phone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#man-phone").parent().parent().addClass('has-error');
    } else if ($("#man-address").val().trim() == '') {
        $("#man-address").tooltip(
            {
                'title'     : '员工联系地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-address").parent().parent().addClass('has-error');
    }else if ($("#man-dept").val().trim() == 0) {
        $("#man-dept").tooltip(
            {
                'title'     : '员工所属部门不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-dept").parent().parent().addClass('has-error');
    }else if ($("#man-role").val().trim() == 0) {
        $("#man-role").tooltip(
            {
                'title'     : '员工角色不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#man-role").parent().parent().addClass('has-error');
    }else{
        $("#man-name").parent().parent().removeClass('has-error');
        $("#man-code").parent().parent().removeClass('has-error');
        $("#man-password").parent().parent().removeClass('has-error');
        $("#man-phone").parent().parent().removeClass('has-error');
        $("#man-address").parent().parent().removeClass('has-error');
        $("#man-dept").parent().parent().removeClass('has-error');
        $("#man-role").parent().parent().removeClass('has-error');

        var formData = new FormData($('#addStaffId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/back/staff/addStaff",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    if(data==1){
                        $("#myMangerUser").modal("hide");
                        alert("添加成功！");
                        $("#man-name").val(null);
                        $("#man-code").val(null);
                        $("#man-password").val(null);
                        $("#man-phone").val(null);
                        $("#man-address").val(null);
                        $("#man-dept").val(null);
                        $("#man-role").val(null);
                        ajxs();
                    }else if(data==0){
                        alert("添加失败！员工账户已存在");
                    }else if(data==2){
                        alert("添加失败！员工手机号码已存在");
                    } else{
                        alert("添加失败！");
                    }
                }
            }
        });
    }
});

$(document).on("click", "#modStaff", function () {
    $("#myModal-Manger").modal("show");
    $.ajax({
        url: "http://localhost:8080/b/back/staff/getStaffBySid",
        type: "post",
        data: {
            sid: $(this).attr("sid")
        },
        dataType: "json",
        success: function (data) {
            if(data!=null&data!=''){
                $("#ManId").val(data["sid"]);
                $("#ManName").val(data["staffName"]);
                $("#ManPhone").val(data["phone"]);
                $("#ManAddress").val(data["address"]);
                $("#ManDept").val(data["deptNo"]);
                $("#ManRole").val(data["staffRole"]);
            }
        }
    });
});

$("#modStaffs").click(function(){
    if ($("#ManName").val().trim()  == '') {
        $("#ManName").tooltip(
            {
                title : '员工姓名不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#ManName").parent().parent().addClass('has-error');
    }else  if ($("#ManPhone").val().trim()  == '')
    {
        $("#ManPhone").tooltip('destroy');
        $("#ManPhone").tooltip(
            {
                title : '手机号码为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#ManPhone").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#ManPhone").val().trim()))) {

        $("#ManPhone").tooltip('destroy');
        $("#ManPhone").tooltip(
            {
                title : '手机号码格式错误',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#ManPhone").parent().parent().addClass('has-error');
    } else if ($("#ManAddress").val().trim() == '') {
        $("#ManAddress").tooltip(
            {
                'title'     : '员工联系地址不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManAddress").parent().parent().addClass('has-error');
    }else if ($("#ManDept").val().trim() == 0) {
        $("#ManDept").tooltip(
            {
                'title'     : '员工所属部门不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManDept").parent().parent().addClass('has-error');
    }else if ($("#ManRole").val().trim() == 0) {
        $("#ManRole").tooltip(
            {
                'title'     : '员工角色不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#ManRole").parent().parent().addClass('has-error');
    }else{
        $("#ManName").parent().parent().removeClass('has-error');
        $("#ManPhone").parent().parent().removeClass('has-error');
        $("#ManAddress").parent().parent().removeClass('has-error');
        $("#ManDept").parent().parent().removeClass('has-error');
        $("#ManRole").parent().parent().removeClass('has-error');
        var formData = new FormData($('#modStaffId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/back/staff/modStaff",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==1){
                    $("#myModal-Manger").modal("hide");
                    alert("修改成功！")
                    $("#ManName").val(null);
                    $("#ManPhone").val(null);
                    $("#ManAddress").val(null);
                    $("#ManDept").val(null);
                    $("#ManRole").val(null);
                    ajxs();
                }else if(data==0){
                    alert("修改失败！该手机号码已存在！")
                }else{
                    alert("修改失败!")
                }
            }
        });
    }
});

$("#getStaffExcel").click(function () {
    let staffName = $("#staffName").val();
    let staffCode = $("#staffCode").val();
    let phone = $("#phone").val();
    let address = $("#address").val();
    let deptNo = $("#deptNo").val();
    let staffRole = $("#staffRole").val();
    let staffStatus = $("#staffStatus").val();
    window.open("http://localhost:8080/b/back/staff/createExcel?staffName="+staffName+"&staffCode="+staffCode+"&phone="+phone+"&address="+address+"&deptNo="+deptNo+"&staffRole="+staffRole+"&staffStatus="+staffStatus);
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