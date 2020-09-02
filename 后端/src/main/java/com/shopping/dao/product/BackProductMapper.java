package com.shopping.dao.product;

import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BackProductMapper {

    //获取商品总数
    public int getCount();

    //获取商品列表
    public List<Product> getProductList(@Param("from") int from, @Param("pageSize") int pageSize);

    //修改商品状态
    public int modStatus(@Param("pid") Integer pid);

    //判断商品名是否重复
    public int isProductNameExist(@Param("productName") String productName);

    //判断商品名是否是不变
    public String ProductName(@Param("pid")Integer pid);

    //修改商品信息
    public int modProduct(Product product);

    //获取类别列表
    public List<ProductType> getProductType();

    //通过pid获得商品信息
    public Product getProductByPid(@Param("pid") Integer pid);

    //获取商品最后一个pid
    public Integer getLastPid();

    //添加商品
    int addProduct(Product product);

    //获得全部商品信息
    public List<Product> getAllProducts();
}
