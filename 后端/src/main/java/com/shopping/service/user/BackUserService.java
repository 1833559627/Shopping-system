package com.shopping.service.user;

import com.shopping.pojo.User;

import java.util.List;

public interface BackUserService {
    //获得用户总数
    public int getCount(String userName,
                        String userCode,
                        String phone,
                        String userAddress,
                        Integer userStatus);

    //查询用户全部信息
    public List<User> getUserList(String userName,
                                  String userCode,
                                  String phone,
                                  String userAddress,
                                  Integer userStatus,
                                  Integer currentPageNo);

    //修改用户状态
    public int modStatus(Integer uid);

    //通过uid获得用户信息
    User getUserByUid(Integer uid);

    //用户名是否存在
    public int isUserNameExist(String userName);

    //手机号码是否存在
    public int isPhoneExist(String phone);

    //修改用户信息
    public int modUser(User user);


}
