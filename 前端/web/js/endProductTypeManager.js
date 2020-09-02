var nowc;
$(function() {
    var pages;
    var currentPage;
    $.ajax({
        url: "http://localhost:8080/b/back/productType/getCount",
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

    $("#productTypePage").bootstrapPaginator(options);


});

function ajxs(current) {
    $.ajax({
        url: "http://localhost:8080/b/back/productType/findAll",
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
                    '<tr class="text-danger">' +
                    '<th class="text-center">编号</th>' +
                    '<th class="text-center">类型名称</th>' +
                    '<th class="text-center">状态</th>' +
                    '<th class="text-center">操作</th>'+
                    '</tr>'+
                    '</thead>';
                for(var i=0;i<data.length;i++){

                    code += '<tbody id="tb"><tr>' +
                        '<td>'+data[i]["tid"]+'</td>' +
                        '<td>'+data[i]["typeName"]+'</td>';
                    if(data[i]["typeStatus"] == 1){
                        code +='<td>启用</td>'
                    }else if(data[i]["typeStatus"] == 0){
                        code +='<td>禁用</td>'
                    }
                    code += '<td class="text-center">'+
                        '<input type="button" id="modType" class="btn btn-warning btn-sm " onclick="doshow('+data[i]["tid"]+')" value="修改" name="toModifyType">&nbsp;';

                    if(data[i]["typeStatus"] == 1){
                        code +='<input type="button" id="modStatus" tid="'+data[i]["tid"]+'" class="btn btn-danger btn-sm doProTypeDisable" value="禁用">';
                    }else if(data[i]["typeStatus"] == 0){
                        code +='<input type="button" id="modStatus" tid="'+data[i]["tid"]+'" class="btn btn-success btn-sm doProDisable" value="启用">';
                    }
                    code +='</td></tr>';
                }
                code+='</tbody></table>';
                tableInfos.innerHTML = code;
        },error:function (data) {
            document.getElementById('tableInfo').innerHTML="";
        }
    });
}



$(document).on("click", "#modStatus", function () {
    $.ajax({
        url: "http://localhost:8080/b/back/productType/modStatus",
        type: "post",
        data: {
            tid: $(this).attr("tid")
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

function doshow(tid) {
    $("#myProductType").modal("show");
    $("#proTypeNum").val(tid);
}

$("#productTypeName").on('blur', function()
{
    if ($("#productTypeName").val().trim() == '')
    {
        $("#productTypeName").tooltip(
            {
                'title'     : '类别名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#productTypeName").parent().parent().addClass('has-error');
    }else
    {
        $("#productTypeName").parent().parent().removeClass('has-error');
    }
});

$("#addType").click(function(){
    if ($("#productTypeName").val().trim()  == '') {
        $("#productTypeName").tooltip(
            {
                title : '类别名称不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#productTypeName").parent().parent().addClass('has-error');
        //return false;
    }else {
        $("#productTypeName").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/productType/addType",
            type: "post",
            data: {
                typeName: $("#productTypeName").val()
            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    $("#ProductType").modal("hide");
                    alert("添加成功！")
                    ajxs(nowc);
                }else if(data==0){
                    alert("添加失败！类别已存在！")
                }else{
                    alert("添加失败!")
                }
            }
        });
    }
});

$("#proTypeName").on('blur', function()
{
    if ($("#proTypeName").val().trim() == '')
    {
        $("#proTypeName").tooltip(
            {
                'title'     : '类别名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#proTypeName").parent().parent().addClass('has-error');
    }else
    {
        $("#proTypeName").parent().parent().removeClass('has-error');
    }
});

$("#modB").click(function () {
    if ($("#proTypeName").val().trim()  == '') {
        $("#proTypeName").tooltip(
            {
                title : '类别名称不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#proTypeName").parent().parent().addClass('has-error');
        //return false;
    }else {
        $("#proTypeName").parent().parent().removeClass('has-error');
        $.ajax({
            url: "http://localhost:8080/b/back/productType/modTypeName",
            type: "post",
            data: {
                tid: $("#proTypeNum").val(),
                typeName: $("#proTypeName").val()
            },
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    if(data==1){
                        $("#myProductType").modal("hide");
                        alert("修改成功！");
                        ajxs(nowc);
                    }else if(data==0){
                        alert("修改失败！类别名称已存在");
                    }else if(data==2){
                        $("#myProductType").modal("hide");
                        ajxs(nowc);
                    }else{
                        alert("修改失败！");
                    }
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