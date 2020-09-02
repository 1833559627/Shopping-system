package com.shopping.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopping.pojo.User;
import com.shopping.service.user.UserService;
import com.shopping.tools.MD5;
import com.shopping.tools.MakeCheckCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;

@Controller
@RequestMapping(value = "/front/user")
public class UserLoginController {

    @Autowired
    private UserService userService;

    String setcode =null;

    @RequestMapping(value = "/doLogin")
    @ResponseBody
    //前台登录
    public User login(@RequestParam(value = "userCode") String userCode,
                      @RequestParam(value = "password") String password,
                      HttpServletRequest request){
        MD5 md5 = new MD5();
        String pwd = md5.md5Change(password);
        User user = new User();
        user.setUserCode(userCode);
        user.setPassword(pwd);

        User login = this.userService.login(user);

        request.getSession().setAttribute("user",login);
        return login;

    }

    @RequestMapping(value = "/code")
    public void code(ServletResponse response, HttpSession session) throws IOException {
        MakeCheckCode makeCheckCode = new MakeCheckCode();
        setcode =  makeCheckCode.getCode(0,0,response.getOutputStream());
    }

    @RequestMapping(value = "/checkCode")
    @ResponseBody
    public String checkCode(){
        return setcode;
    }

    @RequestMapping(value = "/getUserSession")
    @ResponseBody
    public User getUserSession(HttpServletRequest request, HttpServletResponse response)throws Exception{
        //先从session中获取到之前存在session中的用户信息，然后通过ObjectMapper输出返回一个json数据给html页面，由页面去解析这个json数据
        User user=(User)request.getSession().getAttribute("user");
        return user;

    }

    //用户的退出
    @RequestMapping(value = {"logOut"})
    @ResponseBody
    public int logOut(HttpSession session){
        session.removeAttribute("user");
        return 1;
    }

}
