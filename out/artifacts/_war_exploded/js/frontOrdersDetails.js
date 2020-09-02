var orderPrice;
$.ajax({
    url: "http://localhost:8080/b/front/orders/getOrderByOid",
    type: "post",
    async:false,
    data: {
        oid: $("#getOid").val()
    },
    dataType: "json",
    success: function (data) {
        document.getElementById('orderCode').innerHTML=data["orderCode"];
        orderPrice = data["orderPrice"]
    },error:function (data) {
        alert("获取数据异常！")
    }
});
ajas();

function ajas(){
    $.ajax({
        url: "http://localhost:8080/b/front/orders/showOrderDetails",
        type: "post",
        data: {
            oid:$("#getOid").val()
        },
        dataType: "json",
        success: function (data) {
            var orderDetails = document.getElementById('orderDetails');
            var code='<tr><th>商品名称</th><th>商品图片</th><th>商品单价</th><th>商品数量</th><th>商品总价</th></tr>';
            for(var i=0;i<data.length;i++){
                code+='<tr>';
                code+='<td>'+data[i]["productName"]+'</td>';
                code+='<td><img src=http://localhost:8080/b/front/product/getProductPic?pid=' + data[i]["pid"] + ' alt="" width="60" height="60"></td>';
                code+='<td>￥'+data[i]["productPrice"]+'</td>';
                code+='<td>'+data[i]["productNumber"]+'</td>';
                code+='<td>￥'+data[i]["productTolPrice"]+'</td>';
                code+='</tr>';
            }
            code+='<tr>'+
                '<td colspan="5" class="foot-msg">'+
                '共<b><span>'+data.length+'</span></b>条&nbsp; &nbsp;' +
                '总计<b><span>￥'+orderPrice+'</span></b>元'+
                '</td>'+
                '</tr>';
            code += '<tr>' +
                '<td colspan="7" align="right">' +
                '<button class="btn btn-warning " id="backToOrders" type="button" >返回我的订单</button>' +
                '</td>' +
                '</tr>';
            orderDetails.innerHTML = code;
        },error:function (data) {
            alert("获取数据异常！")
        }
    });
}

$(document).on("click", "#backToOrders", function () {
    location.href="myOrders.jsp";
});

