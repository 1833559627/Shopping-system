package com.shopping.service.staff;

import com.shopping.pojo.Department;
import com.shopping.pojo.Staff;

import java.util.List;

public interface BackStaffService {

    //获取全部部门信息
    public List<Department> getDeptList();

    //获得员工总数
    public int getCount(String staffName,
                        String staffCode,
                        String phone,
                        String address,
                        Integer deptNo,
                        Integer staffRole,
                        Integer staffStatus);

    //查询所有员工信息
    public List<Staff> findAll(String staffName,
                               String staffCode,
                               String phone,
                               String address,
                               Integer deptNo,
                               Integer staffRole,
                               Integer staffStatus,
                               Integer currentPageNo);

    //修改员工状态
    public int modStatus(Integer sid);

    //员工账户是否存在
    public int isStaffCodeExist(String staffCode);

    //手机号码是否存在
    public int isPhoneExist(String phone);

    //通过sid获得员工信息
    public Staff getStaffBySid(Integer sid);

    //添加员工管理员
    public int addStaff(Staff staff);

    //修改员工信息
    public int modStaff(Staff staff);

    //获得搜索的员工列表
    public List<Staff> searchStaff(Staff staff);
}
