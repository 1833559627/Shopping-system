package com.shopping.controller.staff;

import com.shopping.pojo.Department;
import com.shopping.pojo.Staff;
import com.shopping.service.staff.BackStaffService;
import com.shopping.tools.Constants;
import com.shopping.tools.MD5;
import com.shopping.tools.PageSupport;
import com.shopping.tools.createExcel;
import jxl.write.WriteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/back/staff")
public class BackStaffController {

    @Autowired
    private BackStaffService backStaffService;

    //获取全部部门信息
    @RequestMapping(value = "getDeptList")
    @ResponseBody
    public List<Department> getDeptList(){
        return this.backStaffService.getDeptList();
    }

    //获得总页数
    @RequestMapping(value = "/getCount")
    @ResponseBody
    PageSupport getCount(@RequestParam(value ="staffName",required = false) String staffName,
                         @RequestParam(value ="staffCode",required = false) String staffCode,
                         @RequestParam(value ="phone",required = false) String phone,
                         @RequestParam(value ="address",required = false) String address,
                         @RequestParam(value ="deptNo",required = false) Integer deptNo,
                         @RequestParam(value ="staffRole",required = false) Integer staffRole,
                         @RequestParam(value ="staffStatus",required = false) Integer staffStatus){
        int count = this.backStaffService.getCount(staffName,staffCode,phone,address,deptNo,staffRole,staffStatus);

        PageSupport pageSupport = new PageSupport();
        //设置页容量
        pageSupport.setPageSize(Constants.pageSize);
        //总记录数
        pageSupport.setTotalCount(count);

        return pageSupport;
    }

    //查询所有员工信息
    @RequestMapping(value = "findAll")
    @ResponseBody
    public List<Staff> findAll(@RequestParam(value ="staffName",required = false) String staffName,
                               @RequestParam(value ="staffCode",required = false) String staffCode,
                               @RequestParam(value ="phone",required = false) String phone,
                               @RequestParam(value ="address",required = false) String address,
                               @RequestParam(value ="deptNo",required = false) Integer deptNo,
                               @RequestParam(value ="staffRole",required = false) Integer staffRole,
                               @RequestParam(value ="staffStatus",required = false) Integer staffStatus,
                               @RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){



        return this.backStaffService.findAll(staffName,staffCode,phone,address,deptNo,staffRole,staffStatus,currentPageNo);
    }

    //修改员工状态
    @RequestMapping(value = "/modStatus")
    @ResponseBody
    public int modStatus(@RequestParam(value = "sid") Integer sid){
        return this.backStaffService.modStatus(sid);
    }

    //通过sid获得员工信息
    @RequestMapping(value = "/getStaffBySid")
    @ResponseBody
    public Staff getStaffBySid(@RequestParam(value = "sid") Integer sid){
        return this.backStaffService.getStaffBySid(sid);
    }

    //添加员工管理员
    @RequestMapping(value = "/addStaff")
    @ResponseBody
    public int addStaff(@RequestParam(value ="staffName") String staffName,
                       @RequestParam(value ="staffCode") String staffCode,
                       @RequestParam(value ="password") String password,
                       @RequestParam(value ="phone") String phone,
                       @RequestParam(value ="address") String address,
                       @RequestParam(value ="deptNo") Integer deptNo,
                       @RequestParam(value ="staffRole") Integer staffRole){

        int staffCodeExist = this.backStaffService.isStaffCodeExist(staffCode);
        int phoneExist = this.backStaffService.isPhoneExist(phone);

        MD5 md5 = new MD5();
        String pwd = md5.md5Change(password);

        Staff staff = new Staff();

        staff.setStaffName(staffName);
        staff.setStaffCode(staffCode);
        staff.setPassword(pwd);
        staff.setPhone(phone);
        staff.setAddress(address);
        staff.setDeptNo(deptNo);
        staff.setStaffRole(staffRole);
        staff.setStaffStatus(1);

        if(staffCodeExist>0){
            return 0;
        }else if(phoneExist>0){
            return 2;
        }else {
            return this.backStaffService.addStaff(staff);
        }

    }

    //修改员工信息
    @RequestMapping(value = "/modStaff")
    @ResponseBody
    public int modStaff( @RequestParam(value = "sid") Integer sid,
                        @RequestParam(value ="staffName") String staffName,
                        @RequestParam(value ="phone") String phone,
                        @RequestParam(value ="address") String address,
                        @RequestParam(value ="deptNo") Integer deptNo,
                        @RequestParam(value ="staffRole") Integer staffRole) {

        int phoneExist = this.backStaffService.isPhoneExist(phone);

        Staff s = this.backStaffService.getStaffBySid(sid);
        String sp = s.getPhone();

        if (phoneExist == 0 || sp.equals(phone)) {
            Staff staff = new Staff();

            staff.setSid(sid);
            staff.setStaffName(staffName);
            staff.setPhone(phone);
            staff.setAddress(address);
            staff.setDeptNo(deptNo);
            staff.setStaffRole(staffRole);

            return this.backStaffService.modStaff(staff);
        } else {
            return 0;
        }

    }

    //打印excel
    @RequestMapping(value = "/createExcel")
    @ResponseBody
    public void createExcel (@RequestParam(value ="staffName",required = false) String staffName,
                             @RequestParam(value ="staffCode",required = false) String staffCode,
                             @RequestParam(value ="phone",required = false) String phone,
                             @RequestParam(value ="address",required = false) String address,
                             @RequestParam(value ="deptNo",required = false) Integer deptNo,
                             @RequestParam(value ="staffRole",required = false) Integer staffRole,
                             @RequestParam(value ="staffStatus",required = false) Integer staffStatus,
                             HttpServletResponse response, ServletRequest request) throws IOException, WriteException {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
        String fname = "员工信息"+df.format(new Date());
        OutputStream os = response.getOutputStream();	//取得输出流
        response.reset();	//清空输出流
        request.setCharacterEncoding("utf-8");
        fname = URLEncoder.encode(fname,"UTF-8");
        response.setHeader("Content-Disposition","attachment;filename="
                +new String(fname.getBytes("UTF-8"),"GBK")+".xls");
        //练习：生成Excel表格中的内容，为当前查询到的数据
        response.setContentType("application/msexcel"); //定义输出类型
        createExcel ce = new createExcel();

        Staff staff = new Staff();
        staff.setStaffName(staffName);
        staff.setStaffCode(staffCode);
        staff.setPhone(phone);
        staff.setAddress(address);
        staff.setDeptNo(deptNo);
        staff.setStaffRole(staffRole);
        staff.setStaffStatus(staffStatus);
        ce.createStaffSheet(os,this.backStaffService.searchStaff(staff));
    }

}
