package com.shopping.controller.product;

import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import com.shopping.service.product.BackProductService;
import com.shopping.tools.Constants;
import com.shopping.tools.PageSupport;
import com.shopping.tools.createExcel;
import jxl.write.WriteException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Controller
@RequestMapping(value = "/back/product")
public class BackProductController {

    @Autowired
    private BackProductService backProductService;

    //获取商品总数
    @RequestMapping(value = "/getCount")
    @ResponseBody
    public PageSupport getCount(@RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){
        int count = this.backProductService.getCount();

        PageSupport pageSupport = new PageSupport();
        //设置当前页
        pageSupport.setCurrentPageNo(currentPageNo);
        //设置页容量
        pageSupport.setPageSize(Constants.pageSize);
        //总记录数
        pageSupport.setTotalCount(count);

        return pageSupport;
    }

    //获取商品列表
    @RequestMapping(value = "/findAll")
    @ResponseBody
    public List<Product> getProductList(@RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){
        return this.backProductService.getProductList(currentPageNo);
    }

    //修改商品状态
    @RequestMapping(value = "/modStatus")
    @ResponseBody
    public int modStatus(@RequestParam(value = "pid") Integer pid){
        return this.backProductService.modStatus(pid);
    }

    //获取类别列表
    @RequestMapping(value = "/getProductType")
    @ResponseBody
    public List<ProductType>  getProductType(){
        return this.backProductService.getProductType();
    }

    //通过pid获得商品信息
    @RequestMapping(value = "/getProductByPid")
    @ResponseBody
    public Product getProductByPid(@RequestParam(value = "pid") Integer pid){
        return this.backProductService.getProductByPid(pid);
    }

    //修改商品信息
    @RequestMapping(value = "/modProduct")
    @ResponseBody
    public int modProduct(@RequestParam(value = "pid") Integer pid,
                          @RequestParam(value = "productName") String productName,
                          @RequestParam(value = "productPic",required = false) MultipartFile productPic,
                          @RequestParam(value = "productPrice") float productPrice,
                          @RequestParam(value = "productType") int productType,
                          @RequestParam(value = "productDes") String productDes) throws IOException {
        Product product = new Product();

        if(this.backProductService.isProductNameExist(productName)>0){
            if(this.backProductService.ProductName(pid).equals(productName)){
                product.setPid(pid);
                product.setProductName(productName);

                if(!productPic.isEmpty()){
                    //String path = "D:\\08";
                    String path = "/root/shopping/productPic";
                    String fileName = pid+"_product.jpg";
                    File dir = new File(path,fileName);
                    if(!dir.exists()){
                        dir.mkdirs();
                    }
                    productPic.transferTo(dir);
                    product.setProductPic(fileName);
                }
                product.setProductPrice(productPrice);
                product.setProductType(productType);
                product.setProductDes(productDes);
                return this.backProductService.modProduct(product);
            }else {
                return 0;
            }
        }else{
            product.setPid(pid);
            product.setProductName(productName);

            if(!productPic.isEmpty()){
                //String path = "D:\\08";
                String path = "/root/pro_image";
                String fileName = pid+"_product.jpg";
                File dir = new File(path,fileName);
                if(!dir.exists()){
                    dir.mkdirs();
                }
                productPic.transferTo(dir);
                product.setProductPic(fileName);
            }

            product.setProductPrice(productPrice);
            product.setProductType(productType);
            product.setProductDes(productDes);
            return this.backProductService.modProduct(product);
        }

    }

    //添加商品
    @RequestMapping(value = "/addProduct")
    @ResponseBody
    public int addProduct(@RequestParam(value = "productName") String productName,
                          @RequestParam(value = "productPic",required = false) MultipartFile productPic,
                          @RequestParam(value = "productPrice") float productPrice,
                          @RequestParam(value = "productType") int productType,
                          @RequestParam(value = "productDes") String productDes) throws IOException {

        if(this.backProductService.isProductNameExist(productName)>0){
            return 0;
        }else {
            Product product = new Product();

            product.setProductName(productName);

            if(!productPic.isEmpty()){
                Integer lastPid = this.backProductService.getLastPid();
                //String path = "D:\\08";
                String path = "/root/shopping/productPic";
                String fileName = (lastPid+1)+"_product.jpg";
                File dir = new File(path,fileName);
                if(!dir.exists()){
                    dir.mkdirs();
                }
                productPic.transferTo(dir);

                product.setProductPic(fileName);
            }else{
                product.setProductPic("nothing");
                return 2;
            }
            product.setProductPrice(productPrice);
            product.setProductType(productType);
            product.setProductStatus(1);
            product.setProductDes(productDes);
            return this.backProductService.addProduct(product);
        }
    }

    //打印excel
    @RequestMapping(value = "/createExcel")
    @ResponseBody
    public void createExcel (HttpServletResponse response, ServletRequest request) throws IOException, WriteException {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
        String fname = "商品信息"+df.format(new Date());
        OutputStream os = response.getOutputStream();	//取得输出流
        response.reset();	//清空输出流
        request.setCharacterEncoding("utf-8");
        fname = URLEncoder.encode(fname,"UTF-8");
        response.setHeader("Content-Disposition","attachment;filename="
                +new String(fname.getBytes("UTF-8"),"GBK")+".xls");
        //练习：生成Excel表格中的内容，为当前查询到的数据
        response.setContentType("application/msexcel"); //定义输出类型
        createExcel ce = new createExcel();

        ce.createProductsSheet(os,this.backProductService.getAllProducts());
    }

    //读取Excel数据
    @RequestMapping(value = "/addProductExcel")
    @ResponseBody
    public String addProductExcel(@RequestParam(value = "file") MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();// 获取文件名

        boolean isExcel;
        if(fileName.matches("^.+\\.(?i)(xls)$")||fileName.matches("^.+\\.(?i)(xlsx)$")){
            isExcel = true;
        } else{
            isExcel = false;
        }

        if(file.isEmpty()||!isExcel){
            return "未发现excel文件！";
        }else{
            return this.backProductService.addProductExcel(file);
        }

    }

}
