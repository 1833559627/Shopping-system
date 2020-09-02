package com.shopping.service.department;

import com.shopping.pojo.Department;

import java.util.List;

public interface DepartmentService {

    //获得部门数量
    public int getCount();

    //查询全部部门信息
    public List<Department> getDeptList(Integer currentPageNo);

    //通过部门id查询部门名称
    public String getDeptNameByDid(Integer did);

    //获得最后的部门id
    public Integer getLastDid();

    //部门名称是否重复
    public int isDeptNameExist(String deptName);

    //部门职能是否重复
    public int isDeptFunExist(String deptFun);

    //添加新部门
    public int addDept(Department department);

    //修改部门状态
    public int modStatus(Integer did);

    //通过部门名称获得部门id
    public Integer getDidByDeptName(String deptName);

    //通过部门id获得部门信息
    public Department getDeptByDid(Integer did);

    //修改部门信息
    public int modDept(Integer did, String deptName, String deptFun);
}
