getPage();

$.ajax({
    url: "http://localhost:8080/b/front/product/getProductType",
    type: "post",
    async:false,
    dataType: "json",
    success: function (data) {
        if(data!=null&&data!=""){
            var typeSe = document.getElementById('typeSe');
            var code = '<option value="0">查询全部</option>';
            for(var i=0;i<data.length;i++){
                code += '<option value="'+data[i]["tid"]+'">'+data[i]["typeName"]+'</option>';
            }
            typeSe.innerHTML = code;
        }
    },error:function (data) {
        alert("暂无商品类别信息！")
    }


});

function getPage() {
    var pages;
    var currentPage;
    var formData = new FormData($('#doSearchFormId')[0]);
    $.ajax({
        url: "http://localhost:8080/b/front/product/getCount",
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

    $("#productPage").bootstrapPaginator(options);
}

function ajxs() {
    var formData = new FormData($('#doSearchFormId')[0]);
    $.ajax({
        url: "http://localhost:8080/b/front/product/search",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (data) {
            var pDiv = document.getElementById('pDiv');
            var code = '';

            for (var i = 0; i < data.length; i++) {
                code += '<div class="col-xs-3  hot-item">' +
                    '<div class="panel clear-panel">' +
                    '<div class="panel-body">' +
                    '<div class="art-back clear-back">';
                code += ' <div class="add-padding-bottom">';
                code+='<img src=http://localhost:8080/b/front/product/getProductPic?pid='+data[i]["pid"]+' class="shopImg"></div>';
                code += '<h4>' + data[i]["productName"] + '</h4>' +
                    '<div class="user clearfix pull-right">￥' + data[i]["productPrice"] + '</div>' +
                    '<div class="desc">' + data[i]["productDes"] + '</div>';
                code += '<div class="attention pull-right" pid="'+data[i]["pid"]+'" id="addToCart">加入购物车<i class="icon iconfont icon-gouwuche"></i></div>' +
                        '</div></div></div></div>';
             }
             pDiv.innerHTML=code;
        },error:function (data) {
            document.getElementById('pDiv').innerHTML="";
        }
    });
}
$("#doSearchSubmit").click(function () {
    getPage();
});

$(document).on("click", "#addToCart", function () {
    var pid = $(this).attr("pid")
    $.ajax({
        url: "http://localhost:8080/b/front/user/getUserSession",
        type: "post",
        dataType: "json",
        success: function (obj) {
            $.ajax({
                url: "http://localhost:8080/b/front/product/addToCart",
                type: "post",
                data: {
                    uid: obj["uid"],
                    pid: pid
                },
                dataType: "text",
                success: function (data) {
                    if(data!=null&data!=''){
                        if(data==1){
                            alert("加入购物车成功！");
                            ajxs();
                        }else if(data==2){
                            alert("该商品已在购物车中！请勿重复添加！");
                        }else{
                            alert("未知错误！加入失败！");
                        }
                    }
                }
            });
        },error:function (obj) {
            alert("请先登录！");
        }
    });

});