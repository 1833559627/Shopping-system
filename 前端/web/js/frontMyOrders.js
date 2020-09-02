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

ajas();
function ajas(){
    $.ajax({
        url: "http://localhost:8080/b/front/orders/showOrders",
        type: "post",
        data: {
            uid:Cuid
        },
        async:false,
        dataType: "json",
        success: function (data) {
            var ordersList = document.getElementById('ordersList');
            var code='<tr><th>订单号</th><th>订单总价</th><th>下单时间</th><th>是否发货</th></tr>';
            for(var i=0;i<data.length;i++){
                code+='<tr>';
                code+='<td class="clear-color" id="gotoOrderDetails" oid="'+data[i]["oid"]+'">';
                code+=data[i]["orderCode"];
                code+='</td>';
                code+='<td>'+data[i]["orderPrice"]+'</td>';
                code+='<td>'+data[i]["orderCreation"]+'</td>';
                if(data[i]["orderStatus"]==0){
                    code+='<td>未发货</td>';
                }else{
                    code+='<td>已发货</td>';
                }
                code+='</tr>';
            }

            ordersList.innerHTML = code;

        },error:function (data) {

        }
    });
}


$(document).on("click", "#gotoOrderDetails", function () {
    location.href="orderDetail.jsp?oid="+$(this).attr("oid");
});