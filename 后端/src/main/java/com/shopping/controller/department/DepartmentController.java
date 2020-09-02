package com.shopping.controller.department;

import com.shopping.pojo.Department;
import com.shopping.service.department.DepartmentService;
import com.shopping.tools.Constants;
import com.shopping.tools.PageSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/back/department")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    String fForm = "BMF"+new SimpleDateFormat("yyyyMMdd").format(new Date());
    String sForm = "BMS"+new SimpleDateFormat("yyyyMMdd").format(new Date());

    Integer lastDid = 0;//最后的did


    //获得部门数量
    @RequestMapping(value = "/getCount")
    @ResponseBody
    PageSupport getCount(){
        int count = this.departmentService.getCount();

        PageSupport pageSupport = new PageSupport();
        //设置页容量
        pageSupport.setPageSize(Constants.pageSize);
        //总记录数
        pageSupport.setTotalCount(count);

        return pageSupport;
    }

    //查询全部部门信息
    @RequestMapping(value = "findAll")
    @ResponseBody
    public List<Department> findAll(@RequestParam(value ="currentPageNo",required = false, defaultValue = "1") Integer currentPageNo){
        List<Department> deptList = this.departmentService.getDeptList(currentPageNo);

        List<Department> depts = new ArrayList<>();
        for(Department department:deptList){
            /*dept.setDid(department.getDid());
            dept.setDeptCode(department.getDeptCode());
            dept.setDeptName(department.getDeptName());
            dept.setDeptFun(department.getDeptFun());
            dept.setDeptTo(department.getDeptTo());*/
            Department dept = new Department();
            dept = department;
            if(department.getDeptTo()==0){
                dept.setDeptToName("--");
            }else{
                dept.setDeptToName(this.departmentService.getDeptNameByDid(department.getDeptTo()));
            }
            dept.setDeptStatus(department.getDeptStatus());

            depts.add(dept);
        }
        return depts;
    }

    //添加新部门
    @RequestMapping(value = "addDept")
    @ResponseBody
    public int addDept(@RequestParam("deptName") String deptName,
                       @RequestParam("deptFun") String deptFun){

        if (this.departmentService.isDeptNameExist(deptName)>0){
            return 0;
        }else if(this.departmentService.isDeptFunExist(deptFun)>0){
            return 2;
        }else{
            Department department = new Department();
            if(this.departmentService.getLastDid()!=null){
               lastDid = this.departmentService.getLastDid();
            }
            if(lastDid>=0&&lastDid<9){
                department.setDeptCode(fForm+"00"+(lastDid+1));
            }else if(lastDid>=9&&lastDid<99){
                department.setDeptCode(fForm+"0"+(lastDid+1));
            }else if(lastDid>=99){
                department.setDeptCode(fForm+(lastDid+1));
            }
            department.setDeptName(deptName);
            department.setDeptFun(deptFun);
            department.setDeptTo(0);
            department.setDeptStatus(1);

            return this.departmentService.addDept(department);
        }
    }


    //修改部门状态
    @RequestMapping(value = "/modStatus")
    @ResponseBody
    public int modTypeStatus(@RequestParam(value = "did") Integer did){
        return this.departmentService.modStatus(did);
    }

    //添加子部门
    @RequestMapping(value = "addSonDept")
    @ResponseBody
    public int addDept(@RequestParam("fDeptName") String fDeptName,
                       @RequestParam("deptName") String deptName,
                       @RequestParam("deptFun") String deptFun){

        Integer fDid = this.departmentService.getDidByDeptName(fDeptName);


        if (this.departmentService.isDeptNameExist(deptName)>0){
            return 0;
        }else if(this.departmentService.isDeptFunExist(deptFun)>0){
            return 2;
        }else{
            Department department = new Department();
            if(this.departmentService.getLastDid()!=null){
                lastDid = this.departmentService.getLastDid();
            }
            if(lastDid>=0&&lastDid<9){
                department.setDeptCode(sForm+"00"+(lastDid+1));
            }else if(lastDid>=9&&lastDid<99){
                department.setDeptCode(sForm+"0"+(lastDid+1));
            }else if(lastDid>=99){
                department.setDeptCode(sForm+(lastDid+1));
            }
            department.setDeptName(deptName);
            department.setDeptFun(deptFun);
            department.setDeptTo(fDid);
            department.setDeptStatus(1);

            return this.departmentService.addDept(department);
        }

    }

    //通过部门id获得部门信息
    @RequestMapping(value = "/getDeptByDid")
    @ResponseBody
    public Department getDeptByDid(@RequestParam("did") Integer did){

        return this.departmentService.getDeptByDid(did);
    }

    //修改部门信息
    @RequestMapping(value = "/modDept")
    @ResponseBody
    public int modDept(@RequestParam("did") Integer did,
                       @RequestParam("deptName") String deptName,
                       @RequestParam("deptFun") String deptFun){

        Department dept = this.departmentService.getDeptByDid(did);

        String dn = dept.getDeptName();
        String df = dept.getDeptFun();

        if(this.departmentService.isDeptNameExist(deptName)==0&&this.departmentService.isDeptFunExist(deptFun)==0){
            return this.departmentService.modDept(did,deptName,deptFun);
        }else if(this.departmentService.isDeptNameExist(deptName)>0){
            if(dn.equals(deptName)){
                if(this.departmentService.isDeptFunExist(deptFun)==0||df.equals(deptFun)){
                    return this.departmentService.modDept(did,deptName,deptFun);
                }else {
                    return 2;
                }
            }else{
                return 0;
            }
        }else if(this.departmentService.isDeptFunExist(deptFun)>0){
            if(df.equals(deptFun)){
                if(this.departmentService.isDeptNameExist(deptFun)==0||dn.equals(deptName)){
                    return this.departmentService.modDept(did,deptName,deptFun);
                }else {
                    return 0;
                }
            }else{
                return 2;
            }
        }
        return 3;
    }
}
