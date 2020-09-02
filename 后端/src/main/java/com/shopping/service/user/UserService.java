package com.shopping.service.user;

import com.shopping.pojo.LifePhoto;
import com.shopping.pojo.User;

import java.util.List;

public interface UserService {

    //前台登录
    public User login(User user);

    //通过用户名获取用户信息
    public User getUserByUserCode(String userCode);

    //通过手机号码获取用户信息
    public User getUserByPhone(String phone);

    //注册用户
    public int register(User user);

    //通过uid获得用户信息
    public User getUserByUid(Integer uid);

    //修改密码
    public int modPassword(Integer uid, String password);

    //修改个人信息
    public int modUserInfo(Integer uid, String userName, String phone, String userAddress);

    //修改头像
    public int modAvatar(Integer uid, String avatar);

    //获取用户的生活照列表
    public List<LifePhoto> getLifePhotoListByUid(Integer uid);

    //获取用户的生活照最后一个照片
    public int getLastLifePhoto(Integer uid);

    //上传生活照
    public int addLifePhoto(Integer uid,String pic);

    //删除生活照
    public int deleteLifePhoto(String pic);

}
