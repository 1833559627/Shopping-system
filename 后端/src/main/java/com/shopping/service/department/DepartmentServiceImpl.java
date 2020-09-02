package com.shopping.service.department;

import com.shopping.dao.department.DepartmentMapper;
import com.shopping.pojo.Department;
import com.shopping.tools.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentMapper departmentMapper;

    //获得部门数量
    public int getCount(){
        return this.departmentMapper.getCount();
    }

    //查询全部部门信息
    public List<Department> getDeptList(Integer currentPageNo) {
        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = Constants.pageSize;
        int from = (currentPageNo-1)*pageSize;
        return this.departmentMapper.getDeptList(from,pageSize);
    }

    //通过部门id查询部门名称
    public String getDeptNameByDid(Integer did){
        return this.departmentMapper.getDeptNameByDid(did);
    }

    //获得最后的部门id
    public Integer getLastDid(){
        return this.departmentMapper.getLastDid();
    }

    //部门名称是否重复
    public int isDeptNameExist(String deptName) {
        return this.departmentMapper.isDeptNameExist(deptName);
    }

    //部门职能是否重复
    public int isDeptFunExist(String deptFun){
        return this.departmentMapper.isDeptFunExist(deptFun);
    }

    //添加新部门
    public int addDept(Department department) {
        return this.departmentMapper.addDept(department);
    }

    //修改部门状态
    public int modStatus(Integer did) {
        return this.departmentMapper.modStatus(did);
    }

    //通过部门名称获得部门id
    public Integer getDidByDeptName(String deptName) {
        return this.departmentMapper.getDidByDeptName(deptName);
    }

    //通过部门id获得部门信息
    public Department getDeptByDid(Integer did) {
        return this.departmentMapper.getDeptByDid(did);
    }

    //修改部门信息
    public int modDept(Integer did, String deptName, String deptFun) {
        return this.departmentMapper.modDept(did,deptName,deptFun);
    }


}
