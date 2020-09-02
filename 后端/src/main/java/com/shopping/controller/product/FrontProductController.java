package com.shopping.controller.product;

import com.shopping.pojo.Cart;
import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import com.shopping.service.product.FrontProductService;
import com.shopping.tools.Constants;
import com.shopping.tools.PageSupport;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Base64;
import java.util.List;

@Controller
@RequestMapping(value = "/front/product")
public class FrontProductController {


    @Autowired
    private FrontProductService frontProductService;

    //获取商品总数
    @RequestMapping(value = "/getCount")
    @ResponseBody
    public PageSupport getCount(@RequestParam(value ="productName",required = false) String productName,
                                @RequestParam(value ="low",required = false,defaultValue = "0")float low,
                                @RequestParam(value ="high",required = false,defaultValue = "10000000")float high,
                                @RequestParam(value ="productType",required = false) Integer productType){
        int count = this.frontProductService.getCount(productName,low,high,productType);

        PageSupport pageSupport = new PageSupport();
        //设置页容量
        pageSupport.setPageSize(4);
        //总记录数
        pageSupport.setTotalCount(count);

        return pageSupport;
    }

    //获取类别列表
    @RequestMapping(value = "/getProductType")
    @ResponseBody
    public List<ProductType>  getProductType(){
        return this.frontProductService.getProductType();
    }

    //通过pid获得商品图片
    @RequestMapping(value = "/getProductPic")
    @ResponseBody
    public File  getProductPic(@RequestParam(value = "pid") Integer pid, HttpServletResponse response) throws IOException

    {
        String pic = this.frontProductService.getProductByPid(pid).getProductPic();
        File file = new File("M:\\shopping\\productPic\\"+pic);
        //File file = new File("/root/shopping/productPic/"+pic);
        if(pic.length()>0){

            InputStream in = new FileInputStream(file);
            byte[] bytearray = new byte[1024];
            while(in.read(bytearray)!=-1){
                response.getOutputStream().write(bytearray);
            }
            response.getOutputStream().flush();//必须清除流，否则图片不能正常显示
            in.close();
        }
        return file;
    }

    //通过pid获得商品图片
    @RequestMapping(value = "/getProductPicByBase")
    @ResponseBody
    public String  getProductPicByBase(@RequestParam(value = "pid") Integer pid, HttpServletResponse response) throws IOException

    {

        String pic = this.frontProductService.getProductByPid(pid).getProductPic();
        //FileInputStream fs = new FileInputStream("/root/shopping/productPic/"+pic);
        FileInputStream fs = new FileInputStream("M:\\shopping\\productPic\\"+pic);
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while (-1 != (len = fs.read(buffer))) {
            outStream.write(buffer, 0, len);
        }
        outStream.close();
        fs.close();

        return Base64.getEncoder().encodeToString(outStream.toByteArray());

    }


    @RequestMapping(value = {"/search"})
    @ResponseBody
    //商品展示
    public List<Product> getProductList(@RequestParam(value ="productName",required = false) String productName,
                                        @RequestParam(value ="low",required = false,defaultValue = "0")float low,
                                        @RequestParam(value ="high",required = false,defaultValue = "10000000")float high,
                                        @RequestParam(value ="productType",required = false) Integer productType,
                                        @RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){

        return this.frontProductService.getProductList(productName,low,high,productType,currentPageNo);
    }

    @RequestMapping(value = {"/getAllProducts"})
    @ResponseBody
    //获取全部有效商品
    public List<Product> getAllProducts(){

        return this.frontProductService.getAllProducts();
    }


    @RequestMapping(value = "/addToCart")
    @ResponseBody
    //添加到购物车
    public int addToCart(@RequestParam("uid") Integer uid,
                         @RequestParam("pid") Integer pid){

        Product product = this.frontProductService.getProductByPid(pid);
        if(product!=null){

            int p = this.frontProductService.isProductExist(uid,pid);
            if(p>0){
                return 2;
            }else{
                Cart cart = new Cart();
                cart.setUid(uid);
                cart.setPid(pid);
                cart.setProductNumber(1);
                cart.setProductStatus(0);
                return this.frontProductService.addToCart(cart);
            }
        }else{
            return 0;
        }
    }

}
