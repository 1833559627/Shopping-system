package com.shopping.dao.department;

import com.shopping.pojo.Department;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DepartmentMapper {

    //获得部门数量
    public int getCount();

    //查询全部部门信息
    public List<Department> getDeptList(@Param("from") int from, @Param("pageSize") int pageSize);

    //通过部门id查询部门名称
    public String getDeptNameByDid(@Param("did") Integer did);

    //获得最后的部门id
    public Integer getLastDid();

    //部门名称是否重复
    public int isDeptNameExist(@Param("deptName") String deptName);

    //部门职能是否重复
    public int isDeptFunExist(@Param("deptFun") String deptFun);

    //添加新部门
    public int addDept(Department department);

    //修改部门状态
    public int modStatus(@Param("did") Integer did);

    //通过部门名称获得部门id
    public Integer getDidByDeptName(@Param("deptName") String deptName);

    //通过部门id获得部门信息
    Department getDeptByDid(@Param("did") Integer did);

    //修改部门信息
    public int modDept(@Param("did")Integer did, @Param("deptName") String deptName,@Param("deptFun") String deptFun);
}
