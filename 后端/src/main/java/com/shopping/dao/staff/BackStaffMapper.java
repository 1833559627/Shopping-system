package com.shopping.dao.staff;

import com.shopping.pojo.Department;
import com.shopping.pojo.Staff;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BackStaffMapper {

    //获取全部部门信息
    public List<Department> getDeptList();

    //获得员工总数
    int getCount(@Param("staffName") String staffName,
                 @Param("staffCode") String staffCode,
                 @Param("phone") String phone,
                 @Param("address") String address,
                 @Param("deptNo") Integer deptNo,
                 @Param("staffRole") Integer staffRole,
                 @Param("staffStatus") Integer staffStatus);

    //查询所有员工信息
    public List<Staff> getStaffList(@Param("staffName") String staffName,
                               @Param("staffCode") String staffCode,
                               @Param("phone") String phone,
                               @Param("address") String address,
                               @Param("deptNo") Integer deptNo,
                               @Param("staffRole") Integer staffRole,
                               @Param("staffStatus") Integer staffStatus,
                               @Param("from") int from,
                               @Param("pageSize") int pageSize);

    //修改员工状态
    public int modStatus(@Param("sid") Integer sid);

    //员工账户是否存在
    public int isStaffCodeExist( @Param("staffCode") String staffCode);

    //手机号码是否存在
    public int isPhoneExist(@Param("phone") String phone);

    //通过sid获得员工信息
    public Staff getStaffBySid(@Param("sid") Integer sid);

    //添加员工管理员
    public int addStaff(Staff staff);

    //修改员工信息
    public int modStaff(Staff staff);

    //获得搜索的员工列表
    public List<Staff> searchStaff(Staff staff);



}
