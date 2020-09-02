package com.shopping.service.product;

import com.shopping.dao.product.FrontProductMapper;
import com.shopping.pojo.Cart;
import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import com.shopping.tools.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FrontProductServiceImpl implements FrontProductService{

    @Autowired
    private FrontProductMapper frontProductMapper;

    //商品展示
    public List<Product> getProductList(String productName,float low, float high, Integer productType, Integer currentPageNo){
        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = 4;
        int from = (currentPageNo-1)*pageSize;

        return this.frontProductMapper.getProductList(productName,low,high,productType,from,pageSize);
    }

    //通过商品id获得商品信息
    public Product getProductByPid(Integer pid){
        return this.frontProductMapper.getProductByPid(pid);
    }

    //商品是否已在购物车里
    public int isProductExist(Integer uid,Integer pid){
        return this.frontProductMapper.isProductExist(uid,pid);
    }

    //添加到购物车
    public int addToCart(Cart cart){
        return this.frontProductMapper.addToCart(cart);
    }

    //获取商品总数
    public int getCount(String productName, float low, float high, Integer productType) {
        return this.frontProductMapper.getCount(productName,low,high,productType);
    }

    //获取类别列表
    public List<ProductType> getProductType() {
        return this.frontProductMapper.getProductType();
    }

    //获取全部有效商品
    public List<Product> getAllProducts() {
        return this.frontProductMapper.getAllProducts();
    }

}
