package com.shopping.service.user;

import com.shopping.dao.user.UserMapper;
import com.shopping.pojo.LifePhoto;
import com.shopping.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    //前台登录
    public User login(User user){
        return this.userMapper.login(user);
    }

    //通过用户名获取用户信息
    public User getUserByUserCode(String userCode) {
        return this.userMapper.getUserByUserCode(userCode);
    }

    //通过手机号码获取用户信息
    public User getUserByPhone(String phone) {
        return this.userMapper.getUserByPhone(phone);
    }

    //注册用户
    public int register(User user){
        return this.userMapper.register(user);
    }

    //通过uid获得用户信息
    public User getUserByUid(Integer uid){
        return this.userMapper.getUserByUid(uid);
    }

    //修改密码
    public int modPassword(Integer uid, String password){
        return this.userMapper.modPassword(uid,password);
    }

    //修改个人信息
    public int modUserInfo(Integer uid, String userName, String phone, String userAddress){
        return this.userMapper.modUserInfo(uid,userName,phone,userAddress);
    }

    //修改头像
    public int modAvatar(Integer uid, String avatar){
        return this.userMapper.modAvatar(uid,avatar);
    }

    //获取用户的生活照列表
    public List<LifePhoto> getLifePhotoListByUid(Integer uid) {
        return this.userMapper.getLifePhotoListByUid(uid);
    }

    //获取用户的生活照最后一个照片
    public int getLastLifePhoto(Integer uid){
        return this.userMapper.getLastLifePhoto(uid);
    }

    //上传生活照
    public int addLifePhoto(Integer uid, String pic) {
        return this.userMapper.addLifePhoto(uid,pic);
    }

    //删除生活照
    public int deleteLifePhoto(String pic) {
        return this.userMapper.deleteLifePhoto(pic);
    }



}
