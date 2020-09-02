package com.shopping.dao.user;

import com.shopping.pojo.LifePhoto;
import com.shopping.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {

    //前台登录
    public User login(User user);

    //通过用户名获取用户信息
    public User getUserByUserCode(@Param("userCode") String userCode);

    //通过手机号码获取用户信息
    public User getUserByPhone(@Param("phone") String phone);

    //注册用户
    public int register(User user);

    //通过uid获得用户信息
    public User getUserByUid(@Param("uid") Integer uid);

    //修改密码
    public int modPassword(@Param("uid") Integer uid, @Param("password") String password);

    //修改个人信息
    public int modUserInfo(@Param("uid") Integer uid,@Param("userName") String userName, @Param("phone") String phone, @Param("userAddress") String userAddress);

    //修改头像
    public int modAvatar(@Param("uid") Integer uid, @Param("avatar") String avatar);

    //获取用户的生活照列表
    public List<LifePhoto> getLifePhotoListByUid(@Param("uid") Integer uid);

    //获取用户的生活照个数
    public int getLastLifePhoto(@Param("uid") Integer uid);

    //上传生活照
    public int addLifePhoto(@Param("uid") Integer uid, @Param("pic") String pic);

    //删除生活照
    public int deleteLifePhoto(@Param("pic") String pic);
}
