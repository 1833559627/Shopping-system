package com.shopping.controller.orders;

import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import com.shopping.service.orders.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "front/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/showOrders")
    @ResponseBody
    //展示订单
    public List<Orders> showOrders(@RequestParam("uid") Integer uid){
        return this.orderService.showOrders(uid);
    }

    @RequestMapping(value = "/showOrderDetails")
    @ResponseBody
    //展示订单详情
    public List<OrderDetails> showOrderDetails(@RequestParam("oid") Integer oid){
        return this.orderService.showOrderDetails(oid);
    }

    @RequestMapping(value = "/getOrderByOid")
    @ResponseBody
    //通过订单id获得订单详情
    public Orders getOrderByOid(@RequestParam("oid") Integer oid){
        return this.orderService.getOrderByOid(oid);
    }


}
