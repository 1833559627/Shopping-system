package com.shopping.dao.user;

import com.shopping.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BackUserMapper {
    //获得用户总数
    public int getCount(@Param("userName") String userName,
                        @Param("userCode") String userCode,
                        @Param("phone") String phone,
                        @Param("userAddress") String userAddress,
                        @Param("userStatus") Integer userStatus);

    //查询用户全部信息
    public List<User> getUserList(@Param("userName") String userName,
                                  @Param("userCode") String userCode,
                                  @Param("phone") String phone,
                                  @Param("userAddress") String userAddress,
                                  @Param("userStatus") Integer userStatus,
                                  @Param("from") int from,
                                  @Param("pageSize") int pageSize);

    //修改用户状态
    public int modStatus(@Param("uid") Integer uid);

    //通过uid获得用户信息
    public User getUserByUid(@Param("uid") Integer uid);

    //用户名是否存在
    public int isUserNameExist(@Param("userName") String userName);

    //手机号码是否存在
    public int isPhoneExist( @Param("phone") String phone);

    //修改用户信息
    public int modUser(User user);
}
