package com.shopping.service.productType;

import com.shopping.dao.productType.ProductTypeMapper;
import com.shopping.pojo.ProductType;
import com.shopping.tools.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeServiceImpl implements ProductTypeService{

    @Autowired
    private ProductTypeMapper productTypeMapper;

    //获取类型总数
    public int getTypeCount(){
        return this.productTypeMapper.getTypeCount();
    }

    //获取商品类别列表
    public List<ProductType> getProductTypeList(Integer currentPageNo){
        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = Constants.pageSize;
        int from = (currentPageNo-1)*pageSize;
        return this.productTypeMapper.getProductTypeList(from,pageSize);
    }

    //添加商品类别
    public int addProductType(String typeName){
        return this.productTypeMapper.addProductType(typeName);
    }

    //判断类别名是否重复
    public int isProductTypeExist(String typeName){
        return this.productTypeMapper.isProductTypeExist(typeName);
    }

    //修改商品状态
    public int modTypeStatus(Integer tid){
        return this.productTypeMapper.modTypeStatus(tid);
    }

    //判断是否名称改变
    public String typeName(Integer tid){
        return this.productTypeMapper.typeName(tid);
    }

    //修改类别名称
    public int modTypeName(Integer tid,String typeName){
        return this.productTypeMapper.modTypeName(tid,typeName);
    }

}
