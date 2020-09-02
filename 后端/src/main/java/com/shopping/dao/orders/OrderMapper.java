package com.shopping.dao.orders;

import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderMapper {

    //展示订单
    public List<Orders> showOrders(@Param("uid") Integer uid);

    //展示订单详情
    public List<OrderDetails> showOrderDetails(@Param("oid") Integer oid);

    //通过订单id获得订单详情
    public Orders getOrderByOid(@Param("oid") Integer oid);
}
