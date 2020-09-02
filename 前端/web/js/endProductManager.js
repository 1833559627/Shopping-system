var nowc;
$(function() {
    var pages;
    var currentPage;
    $.ajax({
        url: "http://localhost:8080/b/back/product/getCount",
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
        url: "http://localhost:8080/b/back/product/findAll",
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
                    '<th class="text-center">编号</th>' +
                    '<th class="text-center">商品</th>' +
                    '<th class="text-center">价格</th>' +
                    '<th class="text-center">产品类型</th>' +
                    '<th class="text-center">状态</th>' +
                    '<th class="text-center">操作</th>' +
                    '</tr>'+
                    '</thead>';
                for(var i=0;i<data.length;i++){

                    code += '<tbody id="tb"><tr>' +
                        '<td>'+data[i]["pid"]+'</td>' +
                        '<td>'+data[i]["productName"]+'</td>'+
                        '<td>'+data[i]["productPrice"]+'</td>'+
                        '<td>'+data[i]["productTypeName"]+'</td>';
                    if(data[i]["productStatus"] == 1){
                        code +='<td>有效商品</td>'
                    }else if(data[i]["productStatus"] == 0){
                        code +='<td>无效商品</td>'
                    }
                    //onclick="doshow('+data[i]["pid"]+')"
                    code += '<td class="text-center">'+
                        '<input type="button" id="modProduct" pid="'+data[i]["pid"]+'" class="btn btn-warning btn-sm " value="修改" name="toModifyType">&nbsp;';

                    if(data[i]["productStatus"] == 1){
                        code +='<input type="button" id="modStatus" pid="'+data[i]["pid"]+'" class="btn btn-danger btn-sm doProTypeDisable" value="禁用">';
                    }else if(data[i]["productStatus"] == 0){
                        code +='<input type="button" id="modStatus" pid="'+data[i]["pid"]+'" class="btn btn-success btn-sm doProDisable" value="启用">';
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

$.ajax({
    url: "http://localhost:8080/b/back/product/getProductType",
    type: "post",
    async:false,
    dataType: "json",
    success: function (data) {
        if(data!=null&&data!=""){
            var pro_type = document.getElementById('pro-type');
            var product_type = document.getElementById('product-type');
            var code = '<option value="0">请选择</option>';
            for(var i=0;i<data.length;i++){
                code += '<option value="'+data[i]["tid"]+'">'+data[i]["typeName"]+'</option>';
            }
            product_type.innerHTML = code;
            pro_type.innerHTML = code;
        }else{
            alert("类型无数据！");
        }
    }

});


$(document).on("click", "#modStatus", function () {
    $.ajax({
        url: "http://localhost:8080/b/back/product/modStatus",
        type: "post",
        data: {
            pid: $(this).attr("pid")
        },
        dataType: "text",
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

$(document).on("click", "#modProduct", function () {
    $("#myProduct").modal("show");
    $.ajax({
        url: "http://localhost:8080/b/back/product/getProductByPid",
        type: "post",
        data: {
            pid: $(this).attr("pid")
        },
        dataType: "json",
        success: function (data) {
            if (data != null & data != '') {
                $("#pro-num").val(data["pid"]);
                $("#pro-name").val(data["productName"]);
                $("#pro-price").val(data["productPrice"]);
                $("#pro-type").val(data["productType"]);
                $("#pro-des").val(data["productDes"]);
            }
        }
    });
});

$("#product-name").on('blur', function()
{
    if ($("#product-name").val().trim() == '')
    {
        $("#product-name").tooltip(
            {
                'title'     : '商品名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-name").parent().parent().addClass('has-error');
    }else
    {
        $("#product-name").parent().parent().removeClass('has-error');
    }
});

var reg =/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
$("#product-price").on('blur', function()
{
    if ($("#product-price").val().trim() == '')
    {
        $("#product-price").tooltip('destroy');
        $("#product-price").tooltip(
            {
                'title'     : '商品价格不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-price").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#product-price").val().trim())))
    {
        $("#product-price").tooltip('destroy');
        $("#product-price").tooltip(
            {
                'title'     : '商品价格格式错误',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');
        $("#product-price").parent().parent().addClass('has-error');
    }else {
        $("#product-price").parent().parent().removeClass('has-error');
    }
});

$("#product-type").on('blur', function()
{
    if ($("#product-type").val().trim() == 0)
    {
        $("#product-type").tooltip(
            {
                'title'     : '商品类型不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-type").parent().parent().addClass('has-error');
    }else
    {
        $("#product-type").parent().parent().removeClass('has-error');
    }
});

$("#product-des").on('blur', function()
{
    if ($("#product-des").val().trim() == '') {
        $("#product-des").tooltip(
            {
                'title'     : '商品描述不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-des").parent().parent().addClass('has-error');
    }else
    {
        $("#product-des").parent().parent().removeClass('has-error');
    }
});

$("#addP").click(function () {
    var fileInput = $('#product-image').get(0).files[0];
    if ($("#product-name").val().trim()  == '') {
        $("#product-name").tooltip(
            {
                title : '商品名称不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#product-name").parent().parent().addClass('has-error');
        //return false;
    }else if(!fileInput){
        $("#getPic").tooltip(
            {
                title : '商品图片不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');
    }if ($("#product-price").val().trim() == '') {
        $("#product-price").tooltip('destroy');
        $("#product-price").tooltip(
            {
                'title'     : '商品价格不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-price").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#product-price").val().trim()))) {
        $("#product-price").tooltip('destroy');
        $("#product-price").tooltip(
            {
                'title'     : '商品价格格式错误',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');
        $("#product-price").parent().parent().addClass('has-error');
    } else if ($("#product-type").val().trim()  == 0) {
        $("#product-type").tooltip(
            {
                title: '商品类型不能为空',
                placement: 'top',
                trigger: 'manual'
            }).tooltip('show');

        $("#product-type").parent().parent().addClass('has-error');
    } else if ($("#product-des").val().trim() == '')
    {
        $("#product-des").tooltip(
            {
                'title'     : '商品描述不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#product-des").parent().parent().addClass('has-error');
    }else{
        $("#product-name").parent().parent().removeClass('has-error');
        $("#getPic").parent().parent().removeClass('has-error');
        $("#product-price").parent().parent().removeClass('has-error');
        $("#product-type").parent().parent().removeClass('has-error');
        $("#product-des").parent().parent().removeClass('has-error');

        var formData = new FormData($('#addId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/back/product/addProduct",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    if(data==1){
                        $("#Product").modal("hide");
                        alert("添加成功！");
                        $("#product-name").val(null);
                        $("#product-image").val(null);
                        $("#product-price").val(null);
                        $("#product-type").val(null);
                        $("#product-des").val(null);
                        ajxs(nowc);
                    }else if(data==0){
                        alert("添加失败！商品名称已存在");
                    }else if(data==2){
                        alert("添加失败！商品图片上传失败");
                    } else{
                        alert("添加失败！");
                    }
                }
            }
        });
    }

});


$("#pro-name").on('blur', function()
{
    if ($("#pro-name").val().trim() == '')
    {
        $("#pro-name").tooltip(
            {
                'title'     : '商品名称不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-name").parent().parent().addClass('has-error');
    }else
    {
        $("#pro-name").parent().parent().removeClass('has-error');
    }
});

var reg =/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
$("#pro-price").on('blur', function()
{
    if ($("#pro-price").val().trim() == '')
    {
        $("#pro-price").tooltip('destroy');
        $("#pro-price").tooltip(
            {
                'title'     : '商品价格不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-price").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#pro-price").val().trim())))
    {
        $("#pro-price").tooltip('destroy');
        $("#pro-price").tooltip(
            {
                'title'     : '商品价格格式错误',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');
        $("#pro-price").parent().parent().addClass('has-error');
    }else {
        $("#pro-price").parent().parent().removeClass('has-error');
    }
});

$("#pro-type").on('blur', function()
{
    if ($("#pro-type").val().trim() == 0)
    {
        $("#pro-type").tooltip(
            {
                'title'     : '商品类型不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-type").parent().parent().addClass('has-error');
    }else
    {
        $("#pro-type").parent().parent().removeClass('has-error');
    }
});

$("#pro-des").on('blur', function()
{
    if ($("#pro-des").val().trim() == '')
    {
        $("#pro-des").tooltip(
            {
                'title'     : '商品描述不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-des").parent().parent().addClass('has-error');
    }else
    {
        $("#pro-des").parent().parent().removeClass('has-error');
    }
});

$("#modP").click(function () {
    if ($("#pro-name").val().trim()  == '') {
        $("#pro-name").tooltip(
            {
                title : '商品名称不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#pro-name").parent().parent().addClass('has-error');

    }else if ($("#pro-price").val().trim() == '')
    {
        $("#pro-price").tooltip('destroy');
        $("#pro-price").tooltip(
            {
                'title'     : '商品价格不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-price").parent().parent().addClass('has-error');
    }else if(!(reg.test($("#pro-price").val().trim())))
    {
        $("#pro-price").tooltip('destroy');
        $("#pro-price").tooltip(
            {
                'title'     : '商品价格格式错误',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');
        $("#pro-price").parent().parent().addClass('has-error');
    }else if ($("#pro-type").val().trim()  == 0) {
        $("#pro-type").tooltip(
            {
                title : '商品类型不能为空',
                placement :  'top',
                trigger   :  'manual'
            }).tooltip('show');

        $("#pro-type").parent().parent().addClass('has-error');
    }else if ($("#pro-des").val().trim() == '') {
        $("#pro-des").tooltip(
            {
                'title'     : '商品描述不能为空',
                'placement' : 'top',
                'trigger'   : 'manual'
            }).tooltip('show');

        $("#pro-des").parent().parent().addClass('has-error');
    }else {
        $("#pro-name").parent().parent().removeClass('has-error');
        $("#pro-price").parent().parent().removeClass('has-error');
        $("#pro-type").parent().parent().removeClass('has-error');
        $("#pro-des").parent().parent().removeClass('has-error');

        var formData = new FormData($('#modId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/back/product/modProduct",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    if(data==1){
                        $("#myProduct").modal("hide");
                        alert("修改成功！");
                        $("#pro-image").val(null);
                        ajxs(nowc);
                    }else if(data==0){
                        alert("修改失败！商品名称已存在");
                    }else{
                        alert("修改失败！");
                    }
                }
            }
        });
    }





});

$("#getXMM").click(function () {
    var fileInput = $('#excelFile').get(0).files[0];
    if(!fileInput) {
        $("#getFile").tooltip(
            {
                title: '表格不能为空',
                placement: 'top',
                trigger: 'manual'
            }).tooltip('show');
        $("#getFile").parent().parent().addClass('has-error');
    }else{
        $("#getFile").parent().parent().removeClass('has-error');
        var formData = new FormData($('#addExcelId')[0]);
        $.ajax({
            url: "http://localhost:8080/b/back/product/addProductExcel",
            type: "post",
            data:formData,
            contentType: false,
            processData: false,
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    
                    if(data == "添加表格内容到数据库成功！"){
                        $("#addExcel").modal("hide");
                        alert(data);
                        $("#excelFile").val(null);
                        ajxs(nowc);
                    }else{
                        $("#excelFile").val(null);
                        alert(data+"请重新导入表格！");
                    }
                }
            }
        });
    }
});




$("#createExcel").click(function () {
    window.open("http://localhost:8080/b/back/product/createExcel");
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