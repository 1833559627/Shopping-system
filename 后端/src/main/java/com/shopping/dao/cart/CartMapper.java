package com.shopping.dao.cart;

import com.shopping.pojo.Cart;
import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CartMapper {

    //展示购物车
    public List<Cart> showCart(@Param("uid") Integer uid);

    //删除购物车商品
    public int delCartItem(@Param("cid") Integer cid);

    //修改购物车
    public int checkCartItem(Cart cart);

    //修改购物车每件商品的结算状态
    public int modCartStatus(@Param("uid") Integer uid);

    //修改购物车商品的结算状态
    public int modProductStatus(@Param("cid") Integer cid);

    //通过cid获取商品列表
    public Cart getCartByCid(@Param("cid") Integer cid);

    //用户之前是否有购物
    public int getOrderCount(@Param("uid") Integer uid);

    //添加到订单
    public int setOrder(Orders order);

    //获得订单最后一行订单号
    public Integer getLastOid();

    //添加到订单详情
    public int setOrderDetails(OrderDetails orderDetails);

    //清除购物车
    public int clearCart(@Param("uid") Integer uid);
}
