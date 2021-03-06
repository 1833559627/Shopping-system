package com.shopping.service.product;

import com.shopping.pojo.Cart;
import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;

import java.util.List;

public interface FrontProductService {

    //商品展示
    public List<Product> getProductList(String productName, float low, float high, Integer productType, Integer currentPageNo);

    //通过商品id获得商品信息
    public Product getProductByPid(Integer pid);

    //商品是否已在购物车里
    public int isProductExist(Integer uid, Integer pid);

    //添加到购物车
    public int addToCart(Cart cart);

    //获取商品总数
    public int getCount(String productName, float low, float high, Integer productType);

    //获取类别列表
    public List<ProductType> getProductType();

    //获取全部有效商品
    public List<Product> getAllProducts();
}
