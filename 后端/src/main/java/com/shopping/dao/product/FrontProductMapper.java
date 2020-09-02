package com.shopping.dao.product;

import com.shopping.pojo.Cart;
import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FrontProductMapper {

    //菜品展示
    public List<Product> getProductList(@Param("productName") String productName,
                                        @Param("low") float low,
                                        @Param("high") float high,
                                        @Param("productType") Integer productType,
                                        @Param("from") int from,
                                        @Param("pageSize") int pageSize);

    //通过商品id获得商品信息
    public Product getProductByPid(@Param("pid") Integer pid);

    //商品是否已在购物车里
    public int isProductExist(@Param("uid") Integer uid, @Param("pid") Integer pid);

    //添加到购物车
    public int addToCart(Cart cart);

    //获取商品总数
    public int getCount(@Param("productName") String productName,
                        @Param("low") float low,
                        @Param("high") float high,
                        @Param("productType") Integer productType);

    //获取类别列表
    public List<ProductType> getProductType();

    //获取全部有效商品
    public List<Product> getAllProducts();
}
