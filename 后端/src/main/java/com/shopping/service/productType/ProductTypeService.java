package com.shopping.service.productType;

import com.shopping.pojo.ProductType;

import java.util.List;

public interface ProductTypeService {

    //获取类型总数
    public int getTypeCount();

    //获取商品类别列表
    public List<ProductType> getProductTypeList(Integer currentPageNo);

    //添加商品类别
    public int addProductType(String typeName);

    //判断类别名是否重复
    public int isProductTypeExist(String typeName);

    //修改商品状态
    public int modTypeStatus(Integer tid);

    //判断是否名称改变
    public String typeName(Integer tid);

    //修改类别名称
    public int modTypeName(Integer tid,String typeName);

}
