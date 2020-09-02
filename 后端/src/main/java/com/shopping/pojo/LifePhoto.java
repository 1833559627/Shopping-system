package com.shopping.pojo;

public class LifePhoto {

    Integer uid;//用户id
    String userPic;//用户生活照
    Integer picStatus;//生活照状态

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUserPic() {
        return userPic;
    }

    public void setUserPic(String userPic) {
        this.userPic = userPic;
    }

    public Integer getPicStatus() {
        return picStatus;
    }

    public void setPicStatus(Integer picStatus) {
        this.picStatus = picStatus;
    }
}
