package com.shopping.dao.productType;

import com.shopping.pojo.ProductType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductTypeMapper {

    //获取类型总数
    public int getTypeCount();

    //获取商品类别列表
    public List<ProductType> getProductTypeList(@Param("from") int from, @Param("pageSize") int pageSize);

    //添加商品类别
    public int addProductType(@Param("typeName") String typeName);

    //判断类别名是否重复
    public int isProductTypeExist(@Param("typeName") String typeName);

    //修改商品状态
    public int modTypeStatus(@Param("tid") Integer tid);

    //判断是否名称改变
    public String typeName(@Param("tid") Integer tid);

    //修改类别名称
    public int modTypeName(@Param("tid") Integer tid,@Param("typeName") String typeName);


}
