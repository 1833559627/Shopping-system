package com.shopping.pojo;

public class Cart {

    Integer cid;//购物车编号
    Integer uid;//用户id
    Integer pid;//商品id
    String productName;//商品名
    String productPic;//商品图片
    float productPrice;//商品价格
    int productNumber;//商品数量
    float productTolPrice;//商品总价
    int productStatus;//购物车是否付款1付款0未付

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public int getProductNumber() {
        return productNumber;
    }

    public void setProductNumber(int productNumber) {
        this.productNumber = productNumber;
    }

    public float getProductTolPrice() {
        return productPrice*productNumber;
    }

    public void setProductTolPrice(float productTolPrice) {
        this.productTolPrice = productTolPrice;
    }

    public int getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(int productStatus) {
        this.productStatus = productStatus;
    }

    public String getProductPic() {
        return productPic;
    }

    public void setProductPic(String productPic) {
        this.productPic = productPic;
    }
}
