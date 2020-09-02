package com.shopping.service.orders;

import com.shopping.dao.orders.OrderMapper;
import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderMapper orderMapper;

    //展示订单
    public List<Orders> showOrders(Integer uid) {
        return this.orderMapper.showOrders(uid);
    }

    //展示订单详情
    public List<OrderDetails> showOrderDetails(Integer oid) {
        return this.orderMapper.showOrderDetails(oid);
    }

    //通过订单id获得订单详情
    public Orders getOrderByOid(Integer oid) {
        return this.orderMapper.getOrderByOid(oid);
    }
}
