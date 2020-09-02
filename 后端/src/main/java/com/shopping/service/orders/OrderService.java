package com.shopping.service.orders;

import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;

import java.util.List;

public interface OrderService {

    //展示订单
    List<Orders> showOrders(Integer uid);

    //展示订单详情
    public List<OrderDetails> showOrderDetails(Integer oid);

    //通过订单id获得订单详情
    public Orders getOrderByOid(Integer oid);
}
