package com.shopping.controller.cart;

import com.shopping.pojo.Cart;
import com.shopping.pojo.OrderDetails;
import com.shopping.pojo.Orders;
import com.shopping.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "front/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping(value = "/showCart")
    @ResponseBody
    //展示购物车
    public List<Cart> showCart(@RequestParam("uid") Integer uid){
        return this.cartService.showCart(uid);
    }

    @RequestMapping(value = "/delCartItem")
    @ResponseBody
    //删除购物车中的商品
    public int delCartItem(@RequestParam("cid") Integer cid){
        return this.cartService.delCartItem(cid);
    }

    @RequestMapping(value = "/clearCart")
    @ResponseBody
    //清除购物车
    public int clearCart(@RequestParam("uid") Integer uid){
        return this.cartService.clearCart(uid);
    }

    @RequestMapping(value = "/modCartItem")
    @ResponseBody
    //修改购物车
    public int checkCartItem(@RequestParam("cid") Integer cid,
                             @RequestParam("productNumber") int productNumber){

        if(productNumber<=0){
            return 0;
        }
        else{
            Cart cart = new Cart();
            cart.setCid(cid);
            cart.setProductNumber(productNumber);
            return this.cartService.checkCartItem(cart);
        }
    }

    //批量删除
    @RequestMapping(value = "/delSome")
    @ResponseBody
    public int delSome(@RequestParam("cids") Integer cids[]){
        for(Integer c:cids){
             this.cartService.delCartItem(c);
        }
        return 1;
    }

    //结算购物车
    @RequestMapping(value = "/gotoCheck")
    @ResponseBody
    public List<Cart> gotoCheck(@RequestParam("cids") Integer cids[]){
        List<Cart> carts = new ArrayList<>();
        for (Integer c:cids){
            Cart cart = this.cartService.getCartByCid(c); //获得购物车条目
            carts.add(cart);
        }
        return carts;
    }

    @RequestMapping(value = "/checkOutCart")
    @ResponseBody
    //生成订单
    public String checkOutCart(@RequestParam("uid") Integer uid,@RequestParam("cids") Integer cids[]){

        OrderDetails orderDetails = new OrderDetails();

        float op = 0;


        for (Integer c:cids) {
            Cart cart = this.cartService.getCartByCid(c); //获得购物车条目
            op += cart.getProductTolPrice();
            this.cartService.modProductStatus(c);
        }

        Orders order = new Orders();
        order.setUid(uid);
        order.setOrderCode(uid+"_"+(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())));
        order.setOrderPrice(op);
        order.setOrderCreation(new Date());
        order.setOrderStatus(0);
        this.cartService.setOrder(order);//添加到订单

        //获得订单最后一行订单号
        Integer lastOid = this.cartService.getLastOid();
        orderDetails.setOid(lastOid);

        for (Integer c:cids){
            Cart cart = this.cartService.getCartByCid(c); //获得购物车条目
            op+=cart.getProductTolPrice();
            orderDetails.setPid(cart.getPid());
            orderDetails.setProductPrice(cart.getProductPrice());
            orderDetails.setProductNumber(cart.getProductNumber());
            orderDetails.setProductTolPrice(cart.getProductTolPrice());
            this.cartService.setOrderDetails(orderDetails);//添加到订单详情
        }
        return order.getOrderCode();
    }

}
