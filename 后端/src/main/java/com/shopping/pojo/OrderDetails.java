package com.shopping.pojo;

public class OrderDetails {

    Integer oid;//订单id
    Integer pid;//商品id
    String productName;//商品名
    String productPic;//商品图片
    float productPrice;//商品单价
    int productNumber;//商品数量
    float productTolPrice;//商品总价

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
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

    public String getProductPic() {
        return productPic;
    }

    public void setProductPic(String productPic) {
        this.productPic = productPic;
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
        return productTolPrice;
    }

    public void setProductTolPrice(float productTolPrice) {
        this.productTolPrice = productTolPrice;
    }
}
