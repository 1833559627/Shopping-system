package com.shopping.controller.user;

import com.shopping.pojo.User;
import com.shopping.service.user.UserService;
import com.shopping.tools.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/front/user")
public class UserRegisterController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/isUserCodeExist")
    @ResponseBody
    //判断有户是否存在
    public int isUserCodeExist(@RequestParam(value = "userCode") String userCode){

        if(this.userService.getUserByUserCode(userCode)!=null){
            return 1;
        }else{
            return 0;
        }
    }

    @RequestMapping(value = "/doRegister")
    @ResponseBody
    //注册
    public int register(@RequestParam(value = "userName") String userName,
                        @RequestParam(value = "userCode") String userCode,
                        @RequestParam(value = "password") String password,
                        @RequestParam(value = "phone") String phone,
                        @RequestParam(value = "userAddress") String userAddress){

        MD5 md5 = new MD5();
        String pwd = md5.md5Change(password);
        if(this.userService.getUserByUserCode(userCode)!=null){
            return 0;
        }else if(this.userService.getUserByPhone(phone)!=null){
            return 2;
        } else{
            User user = new User();
            user.setUserCode(userCode);
            user.setUserName(userName);
            user.setPassword(pwd);
            user.setPhone(phone);
            user.setUserAddress(userAddress);
            return this.userService.register(user);
        }
    }
}
