package com.shopping.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Orders {

    Integer oid;//订单id
    Integer uid;//用户id
    String orderCode;//订单号
    float orderPrice;//订单总价
    String userAddress;//订单地址
    Date orderCreation;//下单时间
    int orderStatus;//订单状态1发货0未发

    public Integer getOid() {
        return oid;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public float getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(float orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public String getOrderCreation() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(this.orderCreation);
    }

    public void setOrderCreation(Date orderCreation) {
        this.orderCreation = orderCreation;
    }

    public int getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(int orderStatus) {
        this.orderStatus = orderStatus;
    }
}
