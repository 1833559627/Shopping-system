package com.shopping.service.product;

import com.shopping.dao.product.BackProductMapper;
import com.shopping.pojo.Product;
import com.shopping.pojo.ProductType;
import com.shopping.tools.Constants;

import com.shopping.tools.ReadExcel;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BackProductServiceImpl implements BackProductService{

    @Autowired
    private BackProductMapper backProductMapper;

    //获取商品总数
    public int getCount(){
        return this.backProductMapper.getCount();
    }

    //获取商品列表
    public List<Product> getProductList(Integer currentPageNo) {
        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = Constants.pageSize;
        int from = (currentPageNo-1)*pageSize;
        return this.backProductMapper.getProductList(from,pageSize);
    }

    //修改商品状态
    public int modStatus(Integer pid) {
        return this.backProductMapper.modStatus(pid);
    }

    //判断商品名是否重复
    public int isProductNameExist(String productName) {
        return this.backProductMapper.isProductNameExist(productName);
    }

    //判断商品名是否是不变
    public String ProductName(Integer pid) {
        return this.backProductMapper.ProductName(pid);
    }

    //修改商品信息
    public int modProduct(Product product) {
        return this.backProductMapper.modProduct(product);
    }

    //获取类别列表
    public List<ProductType> getProductType() {
        return this.backProductMapper.getProductType();
    }

    //通过pid获得商品信息
    public Product getProductByPid(Integer pid) {
        return this.backProductMapper.getProductByPid(pid);
    }

    //获取商品最后一个pid
    public Integer getLastPid(){
        return this.backProductMapper.getLastPid();
    }

    //添加商品
    public int addProduct(Product product) {
        return this.backProductMapper.addProduct(product);
    }

    //获得全部商品信息
    public List<Product> getAllProducts(){
        return this.backProductMapper.getAllProducts();
    }

    //读取添加的excel内容
    public String addProductExcel(MultipartFile file) throws Exception {

        List<Product> allProducts = this.backProductMapper.getAllProducts();//商品列表
        List<ProductType> productTypeList = this.backProductMapper.getProductType();//类型列表

        ReadExcel readExcel = new ReadExcel();
        List<Product> productList = readExcel.addProductExcel(file);

        boolean NE = true;
        int TE = 0;
        for(Product product:productList){

            for(Product p1:allProducts){
                if(product.getProductName().equals(p1.getProductName())){
                    NE = false;
                    break;
                }
            }

            for(ProductType p2:productTypeList){
                if(product.getProductTypeName().equals(p2.getTypeName())){
                    product.setProductType(p2.getTid());
                    TE++;
                    break;
                }
            }
        }
        if(NE&&TE==productList.size()){
            int Xus = 0;
            for(Product product:productList){
                if(this.backProductMapper.addProduct(product)>0){
                   Xus++;
                }
            }
            if(Xus==productList.size()){
                return "添加表格内容到数据库成功！";
            }else{
                return "未知错误！添加失败！";
            }
        } else if(!NE){
            return "表格中有重复的商品名！";
        } else if(TE!=productList.size()){
            return "表格中有错误的类别名称！";
        }
        return "未知错误！添加失败！";
    }
}
