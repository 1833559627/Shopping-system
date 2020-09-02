var cartList= $("#getCart").val().split(',');
$.ajax({
    url: "http://localhost:8080/b/front/cart/gotoCheck",
    type: "post",
    async:false,
    data: {
        'cids':cartList
    },
    traditional:true,
    dataType: "json",
    success: function (data) {
        var checkList = document.getElementById('checkList');
        var tp = 0;
        var code='<tr>' +
            '<th>商品名称</th>' +
            '<th>商品图片</th>' +
            '<th>商品数量</th>' +
            '<th>商品总价</th>' +
            '</tr>';
        for(var i=0;i<data.length;i++){
            tp += data[i]["productTolPrice"];
            code+='<tr>';
            code+='<td>'+data[i]["productName"]+'</td>';
            code+='<td><img src=http://localhost:8080/b/front/product/getProductPic?pid=' + data[i]["pid"] + ' alt="" width="60" height="60"></td>';
            code+='<td>'+data[i]["productNumber"]+'</td>';
            code+='<td>'+data[i]["productTolPrice"]+'</td></tr>';
        }
        code+='<tr><td colspan="5" class="foot-msg">';
        code+='总计：<b> <span>'+tp+'</span></b>元';
        code+='<a href="cart.jsp"><button class="btn btn-warning pull-right ">返回</button></a>';
        code+='<button class="btn btn-warning pull-right margin-right-15" id="checkOut" data-toggle="modal" data-target="#buildOrder" >生成订单</button></td></tr>';

        checkList.innerHTML = code;

    },error:function (data) {
        alert("获取数据异常！")
    }
});

$(document).on("click", "#checkOut", function () {
    $.ajax({
        url: "http://localhost:8080/b/front/cart/checkOutCart",
        type: "post",
        async: false,
        data: {
            'uid': $("#getUid").val(),
            'cids': cartList
        },
        traditional: true,
        dataType: "text",
        success: function (data) {
            var orderCode = document.getElementById('orderCode');
            if(data!=null&&data!=''){
                orderCode.innerHTML=data;
                alert("结算成功！订单号为："+data);
                location.href="cart.jsp";
            }else{
                alert("未知错误！结算失败！");
            }
        }
    });
});