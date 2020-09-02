package com.shopping.controller.staff;

import com.shopping.pojo.Staff;
import com.shopping.service.staff.StaffService;
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
import java.io.IOException;

@Controller
@RequestMapping(value = "/back/staff")
public class StaffLoginController {

    String setcode =null;

    @Autowired
    private StaffService staffService;

    @RequestMapping(value = "/doLogin")
    @ResponseBody
    //后台登录
    public Staff login(@RequestParam(value = "staffCode") String staffCode,
                       @RequestParam(value = "password") String password,
                       HttpServletRequest request){

            MD5 md5 = new MD5();
            String pwd = md5.md5Change(password);

            Staff staff = new Staff();
            staff.setStaffCode(staffCode);
            staff.setPassword(pwd);

            Staff login = this.staffService.login(staff);
            request.getSession().setAttribute("staff",login);
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

    @RequestMapping(value = "/getStaffSession")
    @ResponseBody
    public Staff getStaffSession(HttpServletRequest request, HttpServletResponse response)throws Exception{
        //先从session中获取到之前存在session中的用户信息，然后通过ObjectMapper输出返回一个json数据给html页面，由页面去解析这个json数据
        Staff staff=(Staff)request.getSession().getAttribute("staff");
        return staff;

    }

    //用户的退出
    @RequestMapping(value = {"logOut"})
    @ResponseBody
    public int logOut(HttpSession session){
        session.removeAttribute("staff");
        return 1;
    }

}
