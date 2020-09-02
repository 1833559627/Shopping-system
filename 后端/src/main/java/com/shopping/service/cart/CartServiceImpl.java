package com.shopping.service.cart;

import com.shopping.dao.cart.CartMapper;
import com.shopping.pojo.Cart;
import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartMapper cartMapper;

    //展示购物车
    public List<Cart> showCart(Integer uid){
        return this.cartMapper.showCart(uid);
    }

    //删除购物车商品
    public int delCartItem(Integer cid){
        return this.cartMapper.delCartItem(cid);
    }

    //修改购物车
    public int checkCartItem(Cart cart){
        return this.cartMapper.checkCartItem(cart);
    }

    //修改购物车每件商品的结算状态
    public int modCartStatus(Integer uid){
        return this.cartMapper.modCartStatus(uid);
    }

    //修改购物车商品的结算状态
    public int modProductStatus(Integer cid) {
        return this.cartMapper.modProductStatus(cid);
    }

    //通过cid获取商品列表
    public Cart getCartByCid(Integer cid) {
        return this.cartMapper.getCartByCid(cid);
    }

    //用户之前是否有购物
    public int getOrderCount(Integer uid){
        return this.cartMapper.getOrderCount(uid);
    }

    //添加到订单
    public int setOrder(Orders order){
        return this.cartMapper.setOrder(order);
    }

    //获得订单最后一行订单号
    public Integer getLastOid(){
        return this.cartMapper.getLastOid();
    }

    //添加到订单详情
    public int setOrderDetails(OrderDetails orderDetails){
        return this.cartMapper.setOrderDetails(orderDetails);
    }

    //清除购物车
    public int clearCart(Integer uid) {
        return this.cartMapper.clearCart(uid);
    }

}
