package com.shopping.controller.user;

import com.shopping.pojo.User;
import com.shopping.service.user.BackUserService;
import com.shopping.tools.Constants;
import com.shopping.tools.PageSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/back/user")
public class BackUserController {

    @Autowired
    private BackUserService backUserService;

    //获得总页数
    @RequestMapping(value = "/getCount")
    @ResponseBody
    PageSupport getCount(@RequestParam(value ="userName",required = false) String userName,
                         @RequestParam(value ="userCode",required = false) String userCode,
                         @RequestParam(value ="phone",required = false) String phone,
                         @RequestParam(value ="userAddress",required = false) String userAddress,
                         @RequestParam(value ="userStatus",required = false) Integer userStatus){
        int count = this.backUserService.getCount(userName,userCode,phone,userAddress,userStatus);

        PageSupport pageSupport = new PageSupport();
        //设置页容量
        pageSupport.setPageSize(Constants.pageSize);
        //总记录数
        pageSupport.setTotalCount(count);

        return pageSupport;
    }

    //查询用户全部信息
    @RequestMapping(value = "findAll")
    @ResponseBody
    public List<User> findAll(@RequestParam(value ="userName",required = false) String userName,
                              @RequestParam(value ="userCode",required = false) String userCode,
                              @RequestParam(value ="phone",required = false) String phone,
                              @RequestParam(value ="userAddress",required = false) String userAddress,
                              @RequestParam(value ="userStatus",required = false) Integer userStatus,
                              @RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){

        return this.backUserService.getUserList(userName,userCode,phone,userAddress,userStatus,currentPageNo);

    }

    //修改用户状态
    @RequestMapping(value = "/modStatus")
    @ResponseBody
    public int modStatus(@RequestParam(value = "uid") Integer uid){
        return this.backUserService.modStatus(uid);
    }

    //通过uid获得用户信息
    @RequestMapping(value = "/getUserByUid")
    @ResponseBody
    public User getUserByUid(@RequestParam(value = "uid") Integer uid){
        return this.backUserService.getUserByUid(uid);
    }

    //修改用户信息
    @RequestMapping(value = "/modUser")
    @ResponseBody
    public int modUser(@RequestParam(value = "uid") Integer uid,
                       @RequestParam(value ="userName") String userName,
                       @RequestParam(value ="phone") String phone,
                       @RequestParam(value ="userAddress") String userAddress){

        int phoneExist = this.backUserService.isPhoneExist(phone);

        User u = this.backUserService.getUserByUid(uid);

        String up = u.getPhone();

        User user = new User();

        user.setUid(uid);
        user.setUserName(userName);
        user.setPhone(phone);
        user.setUserAddress(userAddress);

        if(phoneExist==0||up.equals(phone)){
            return this.backUserService.modUser(user);
        }else {
            return 0;
        }
    }
}
