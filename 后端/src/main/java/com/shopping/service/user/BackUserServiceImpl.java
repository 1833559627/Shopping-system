package com.shopping.service.user;

import com.shopping.dao.user.BackUserMapper;
import com.shopping.pojo.User;
import com.shopping.tools.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BackUserServiceImpl implements BackUserService{

    @Autowired
    private BackUserMapper backUserMapper;

    //获得用户总数
    public int getCount(String userName,
                        String userCode,
                        String phone,
                        String userAddress,
                        Integer userStatus) {
        return this.backUserMapper.getCount(userName,userCode,phone,userAddress,userStatus);
    }

    //查询用户全部信息
    public List<User> getUserList(String userName,
                                  String userCode,
                                  String phone,
                                  String userAddress,
                                  Integer userStatus,
                                  Integer currentPageNo) {
        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = Constants.pageSize;
        int from = (currentPageNo-1)*pageSize;
        return this.backUserMapper.getUserList(userName,userCode,phone,userAddress,userStatus,from,pageSize);
    }

    //修改用户状态
    public int modStatus(Integer uid) {
        return this.backUserMapper.modStatus(uid);
    }

    //通过uid获得用户信息
    public User getUserByUid(Integer uid) {
        return this.backUserMapper.getUserByUid(uid);
    }

    //用户名是否存在
    public int isUserNameExist(String userName){
        return this.backUserMapper.isUserNameExist(userName);
    }

    //手机号码是否存在
    public int isPhoneExist(String phone){
        return this.backUserMapper.isPhoneExist(phone);
    }

    //修改用户信息
    public int modUser(User user){
        return this.backUserMapper.modUser(user);
    }
}
