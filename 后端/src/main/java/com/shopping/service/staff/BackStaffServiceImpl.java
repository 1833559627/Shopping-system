package com.shopping.service.staff;

import com.shopping.dao.staff.BackStaffMapper;
import com.shopping.pojo.Department;
import com.shopping.pojo.Staff;
import com.shopping.tools.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BackStaffServiceImpl implements BackStaffService {

    @Autowired
    private BackStaffMapper backStaffMapper;

    //获取全部部门信息
    public List<Department> getDeptList() {
        return this.backStaffMapper.getDeptList();
    }

    //获得员工总数
    public int getCount(String staffName, String staffCode, String phone, String address, Integer deptNo, Integer staffRole, Integer staffStatus) {
        return this.backStaffMapper.getCount(staffName,staffCode,phone,address,deptNo,staffRole,staffStatus);
    }

    //查询所有员工信息
    public List<Staff> findAll(String staffName,
                               String staffCode,
                               String phone,
                               String address,
                               Integer deptNo,
                               Integer staffRole,
                               Integer staffStatus,
                               Integer currentPageNo) {

        //索引from=(当前页码currentPageNo-1)*页容量pageSize
        int pageSize = Constants.pageSize;
        int from = (currentPageNo-1)*pageSize;

        return this.backStaffMapper.getStaffList(staffName,staffCode,phone,address,deptNo,staffRole,staffStatus,from,pageSize);
    }

    //修改员工状态
    public int modStatus(Integer sid) {
        return this.backStaffMapper.modStatus(sid);
    }

    //员工账户是否存在
    public int isStaffCodeExist(String staffCode){
        return this.backStaffMapper.isStaffCodeExist(staffCode);
    }

    //手机号码是否存在
    public int isPhoneExist(String phone){
        return this.backStaffMapper.isPhoneExist(phone);
    }

    //通过sid获得员工信息
    public Staff getStaffBySid(Integer sid){
        return this.backStaffMapper.getStaffBySid(sid);
    }

    //添加员工管理员
    public int addStaff(Staff staff) {
        return this.backStaffMapper.addStaff(staff);
    }

    //修改员工信息
    public int modStaff(Staff staff) {
        return this.backStaffMapper.modStaff(staff);
    }

    //获得搜索的员工列表
    public List<Staff> searchStaff(Staff staff) {
        return this.backStaffMapper.searchStaff(staff);
    }
}
