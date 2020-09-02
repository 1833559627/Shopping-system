var nowc;
$(function() {
    var pages;
    var currentPage;
    $.ajax({
        url: "http://localhost:8080/b/back/department/getCount",
        type: "post",
        async: false,
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
                ajxs(current);
                nowc = current;
            }
        };

    $("#productPage").bootstrapPaginator(options);


});

function ajxs(current) {
    $.ajax({
        url: "http://localhost:8080/b/back/department/findAll",
        type: "post",
        async:false,
        data: {
            currentPageNo: current
        },
        dataType: "json",
        success: function (data) {
                var tableInfos = document.getElementById('tableInfo');
                var code = '<table class="table table-bordered table-hover" style=\'text-align: center;\'>';
                code += '<thead> ' +
                    '<th class="text-center">序号</th>\n' +
                    '<th class="text-center">部门编号</th>\n' +
                    '<th class="text-center">部门名称</th>\n' +
                    '<th class="text-center">部门职能</th>\n' +
                    '<th class="text-center">所属部门</th>\n' +
                    '<th class="text-center">部门状态</th>\n' +
                    '<th class="text-center">操作</th>'+
                    '</thead>';
                for(var i=0;i<data.length;i++){
                    code += '<tbody id="tb"><tr>' +
                        '<td>'+data[i]["did"]+'</td>' +
                        '<td>'+data[i]["deptCode"]+'</td>'+
                        '<td>'+data[i]["deptName"]+'</td>'+
                        '<td>'+data[i]["deptFun"]+'</td>'+
                        '<td>'+data[i]["deptToName"]+'</td>';
                    if(data[i]["deptStatus"] == 1){
                        code +='<td>有效</td>'
                    }else if(data[i]["deptStatus"] == 0){
                        code +='<td>无效</td>'
                    }
                    code += '<td class="text-center">'+
                        '<input type="button" id="addDeptTo" deptName="'+data[i]["deptName"]+'" class="btn btn-info btn-sm " value="添加子部门">&nbsp;'+
                        '<input type="button" id="modDept" did="'+data[i]["did"]+'" class="btn btn-warning btn-sm " value="修改">&nbsp;';

                    if(data[i]["deptStatus"] == 1){
                        code +='<input type="button" id="modStatus" did="'+data[i]["did"]+'" class="btn btn-danger btn-sm doProTypeDisable" value="禁用">';
                    }else if(data[i]["deptStatus"] == 0){
                        code +='<input type="button" id="modStatus" did="'+data[i]["did"]+'" class="btn btn-success btn-sm doProDisable" value="启用">';
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

$(document).on("click", "#modStatus", function () {
    $.ajax({
        url: "http://localhost:8080/b/back/department/modStatus",
        type: "post",
        data: {
            did: $(this).attr("did")
        },
        dataType: "json",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    ajxs(nowc);
                }else{
                    alert("更新状态失败！")
                }
            }
        }
    });
});

$("#dept-name").on('blur', function()
{
    if ($("#dept-name").val().trim() == '')
    {
        $("#dept-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dept-name").parent().parent().addClass('has-error');
    }else
    {
        $("#dept-name").parent().parent().removeClass('has-error');
    }
});

$("#dept-duty").on('blur', function()
{
    if ($("#dept-duty").val().trim() == '')
    {
        $("#dept-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dept-duty").parent().parent().addClass('has-error');
    }else
    {
        $("#dept-duty").parent().parent().removeClass('has-error');
    }
});

$("#addDept").click(function(){
    if ($("#dept-name").val().trim() == '') {
        $("#dept-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dept-name").parent().parent().addClass('has-error');
    }else if ($("#dept-duty").val().trim() == '') {
        $("#dept-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dept-duty").parent().parent().addClass('has-error');
    }else {
        var formData = new FormData($('#addDeptId')[0]);
        $("#dept-name").parent().parent().removeClass('has-error');
        $("#dept-duty").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/department/addDept",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==1){
                    $("#Dept").modal("hide");
                    alert("添加成功！")
                    $("#dept-name").val(null);
                    $("#dept-duty").val(null);
                    ajxs(nowc);
                }else if(data==0){
                    alert("添加失败！部门名称已存在！")
                }else if(data==2){
                    alert("添加失败！部门职能已存在！")
                }else{
                    alert("添加失败!")
                }
            }
        });
    }
});



$(document).on("click", "#addDeptTo", function () {
    $("#sonDept").modal("show");
    $("#dep-toName").val($(this).attr("deptName"))
});

$("#dep-name").on('blur', function()
{
    if ($("#dep-name").val().trim() == '')
    {
        $("#dep-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dep-name").parent().parent().addClass('has-error');
    }else
    {
        $("#dep-name").parent().parent().removeClass('has-error');
    }
});

$("#dep-duty").on('blur', function()
{
    if ($("#dep-duty").val().trim() == '')
    {
        $("#dep-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dep-duty").parent().parent().addClass('has-error');
    }else
    {
        $("#dep-duty").parent().parent().removeClass('has-error');
    }
});

$("#addSonDept").click(function(){
    if ($("#dep-name").val().trim() == '') {
        $("#dep-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dep-name").parent().parent().addClass('has-error');
    }else if ($("#dep-duty").val().trim() == '') {
        $("#dep-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#dep-duty").parent().parent().addClass('has-error');
    }else{
        var formData = new FormData($('#addSonDeptId')[0]);
        $("#dep-name").parent().parent().removeClass('has-error');
        $("#dep-duty").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/department/addSonDept",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==1){
                    $("#sonDept").modal("hide");
                    alert("添加成功！")
                    $("#dep-name").val(null);
                    $("#dep-duty").val(null);
                    ajxs(nowc);
                }else if(data==0){
                    alert("添加失败！部门名称已存在！")
                }else if(data==2){
                    alert("添加失败！部门职能已存在！")
                }else{
                    alert("添加失败!")
                }
            }
        });
    }
});

$(document).on("click", "#modDept", function () {
    $("#modifyDept").modal("show");
    $.ajax({
        url: "http://localhost:8080/b/back/department/getDeptByDid",
        type: "post",
        data: {
            did: $(this).attr("did")
        },
        dataType: "json",
        success: function (data) {
            if (data != null & data != '') {
                $("#de-id").val(data["did"]);
                $("#de-name").val(data["deptName"]);
                $("#de-duty").val(data["deptFun"]);
            }
        }
    });
});

$("#de-name").on('blur', function()
{
    if ($("#de-name").val().trim() == '')
    {
        $("#de-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#de-name").parent().parent().addClass('has-error');
    }else
    {
        $("#de-name").parent().parent().removeClass('has-error');
    }
});

$("#de-duty").on('blur', function()
{
    if ($("#de-duty").val().trim() == '')
    {
        $("#de-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#de-duty").parent().parent().addClass('has-error');
    }else
    {
        $("#de-duty").parent().parent().removeClass('has-error');
    }
});

$("#modsDept").click(function(){
    if ($("#de-name").val().trim() == '') {
        $("#de-name").tooltip(
            {
                'title'     : '部门名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#de-name").parent().parent().addClass('has-error');
    }else if ($("#de-duty").val().trim() == '') {
        $("#de-duty").tooltip(
            {
                'title'     : '部门职能不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#de-duty").parent().parent().addClass('has-error');
    }else{
        var formData = new FormData($('#modDeptId')[0]);
        $("#de-name").parent().parent().removeClass('has-error');
        $("#de-duty").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/department/modDept",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data==1){
                    $("#modifyDept").modal("hide");
                    alert("修改成功！")
                    $("#de-name").val(null);
                    $("#de-duty").val(null);
                    ajxs(nowc);
                }else if(data==0){
                    alert("修改失败！部门名称已存在！")
                }else if(data==2){
                    alert("修改失败！部门职能已存在！")
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