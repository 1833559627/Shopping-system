var Cuid;
$.ajax({
    url: "http://localhost:8080/b/front/user/getUserSession",
    type: "post",
    dataType: "json",
    async:false,
    success: function (obj) {
        Cuid = obj["uid"];
    },error:function (obj) {
        alert("请先登录！");
        location.href="/f/front/main.jsp";
    }
});

ajxs();
function ajxs() {
    $.ajax({
        url: "http://localhost:8080/b/front/cart/showCart",
        type: "post",
        data: {
            uid: Cuid
        },
        async:false,
        dataType: "json",
        success: function (data) {
            var tp = 0;
            var cartItem = document.getElementById('cartItem');
            var code = '<tr><th>' +
                '<input type="checkbox" id="checkboxAll">全选</th>' +
                '<th>商品名称</th><th>商品图片</th><th>商品单价</th><th>商品数量</th><th>商品总价</th><th>操作</th></tr>';
            for (var i = 0; i < data.length; i++) {
                tp += data[i]["productTolPrice"];
                code += '<tr><td><input type="checkbox" name="cb" value="' + data[i]["cid"] + '"></td>';
                code += '<td>' + data[i]["productName"] + '</td>';
                code += '<td> <img src=http://localhost:8080/b/front/product/getProductPic?pid=' + data[i]["pid"] + ' alt="" width="60" height="60"></td>';
                code += '<td>' + data[i]["productPrice"] + '</td>';
                code += '<td><input type="text" id="pn" value="' + data[i]["productNumber"] +'" size="3"> </td>';
                code += '<td>' + data[i]["productTolPrice"] + '</td>';
                code += '<td>' +
                    '<button class="btn btn-success" type="button" id="modCartItem" cid="'+data[i]["cid"]+'"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>修改</button>';
                code+='<button class="btn btn-danger" cid="'+data[i]["cid"]+'" id="delCartItem" type="button">' +
                    '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</button>' +
                    '</td></tr>';
            }
            code += '<tr>' +
                '<td colspan="7" align="right">' +
                '<button class="btn btn-warning margin-right-15" id="delSome" type="button" > 删除选中项</button>' +
                '<button class="btn btn-warning  margin-right-15" type="button" id="clearCart" > 清空购物车</button>' +
                '<button class="btn btn-warning " id="gotoCheckOut" type="button" > 结算</button>' +
                '</td>' +
                '</tr>';
            cartItem.innerHTML = code;
        },
        error: function (data) {
            var cartItem = document.getElementById('cartItem');
            cartItem.innerHTML ='暂无购物信息';
        }
    });
}

$(document).on("click", "#checkboxAll", function () {
    $("input[type='checkbox']").prop("checked", $("#checkboxAll").prop("checked"));
});

$(document).on("click", "#delCartItem", function () {
    $.ajax({
        url: "http://localhost:8080/b/front/cart/delCartItem",
        type: "post",
        async:false,
        data: {
            cid: $(this).attr("cid")
        },
        dataType: "text",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    alert("删除成功！");
                    ajxs();
                }else{
                    alert("未知错误！删除失败！");
                }
            }
        }
    });
});

$(document).on("click", "#clearCart", function () {
    $.ajax({
        url: "http://localhost:8080/b/front/cart/clearCart",
        type: "post",
        async:false,
        data: {
            uid: Cuid
        },
        dataType: "text",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    alert("清空成功！");
                    ajxs();
                }else{
                    alert("没有可以删除的商品！清空失败！");
                }
            }
        }
    });
});

$(document).on("click", "#modCartItem", function () {
    $.ajax({
        url: "http://localhost:8080/b/front/cart/modCartItem",
        type: "post",
        async:false,
        data: {
            cid: $(this).attr('cid'),
            productNumber:$("input[type='text']", $(this).parent().parent()).val()
        },
        dataType: "text",
        success: function (data) {
            if(data!=null&data!=''){
                if(data==1){
                    ajxs();
                }else if(data==0){
                    alert("商品数量不能小于0！")
                }
            }
        }
    });
});

$(document).on("click", "#delSome", function () {
    var checkID = [];//定义一个空数组
    $("input[name='cb']:checked").each(function(i){//把所有被选中的复选框的值存入数组
        checkID[i] =$(this).val();
    });
    if(checkID!=null&&checkID.length!=0){
        $.ajax({
            url: "http://localhost:8080/b/front/cart/delSome",
            type: "post",
            async:false,
            data: {
                'cids':checkID
            },
            traditional:true,
            dataType: "text",
            success: function (data) {
                if(data!=null&data!=''){
                    if(data==1){
                        ajxs();
                    }else if(data==0){
                        alert("未知错误！删除失败！")
                    }
                }
            }
        });
    }else{
        alert("您未选择任何商品！");
    }

});

$(document).on("click", "#gotoCheckOut", function () {
    var checkID = [];//定义一个空数组
    $("input[name='cb']:checked").each(function(i){//把所有被选中的复选框的值存入数组
        checkID[i] =$(this).val();
    });
    if(checkID!=null&&checkID.length!=0){
        location.href="order.jsp?uid="+Cuid+"&checkItem="+checkID;
    }else {
        alert("您未选择任何商品！");
    }

});



