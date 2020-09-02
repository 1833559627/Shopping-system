package com.shopping.controller.productType;

import com.shopping.pojo.ProductType;
import com.shopping.service.productType.ProductTypeService;
import com.shopping.tools.Constants;
import com.shopping.tools.PageSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping(value = "/back/productType")
public class ProductTypeController {

    @Autowired
    private ProductTypeService productTypeService;

    //获取类型总数
    @RequestMapping(value = "/getCount")
    @ResponseBody
    public PageSupport getCount(@RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){
        int typeCount = this.productTypeService.getTypeCount();

        PageSupport pageSupport = new PageSupport();
        //设置当前页
        pageSupport.setCurrentPageNo(currentPageNo);
        //设置页容量
        pageSupport.setPageSize(Constants.pageSize);
        //总记录数
        pageSupport.setTotalCount(typeCount);

        return pageSupport;
    }

    //获取商品类别列表
    @RequestMapping(value = "/findAll")
    @ResponseBody
    public List<ProductType> getProductTypeList(@RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){
        return this.productTypeService.getProductTypeList(currentPageNo);
    }

    //添加商品类别
    @RequestMapping(value = "/addType")
    @ResponseBody
    public int addProductType(@RequestParam(value = "typeName") String typeName){
        if(this.productTypeService.isProductTypeExist(typeName)>0){
            return 0;
        }else{
            return this.productTypeService.addProductType(typeName);
        }
    }

    //修改类别状态
    @RequestMapping(value = "/modStatus")
    @ResponseBody
    public int modTypeStatus(@RequestParam(value = "tid") Integer tid){
        return this.productTypeService.modTypeStatus(tid);
    }

    //修改商品类别
    @RequestMapping(value = "/modTypeName")
    @ResponseBody
    public int modTypeName(@RequestParam(value = "tid") Integer tid,@RequestParam(value = "typeName") String typeName){

        if(this.productTypeService.isProductTypeExist(typeName)>0){
            if(this.productTypeService.typeName(tid).equals(typeName)){
                 this.productTypeService.modTypeName(tid,typeName);
                 return 2;
            }else{
                return 0;
            }
        }else{
            return this.productTypeService.modTypeName(tid,typeName);
        }
    }
}
