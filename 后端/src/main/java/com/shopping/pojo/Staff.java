package com.shopping.pojo;

public class Staff {

    Integer sid;//员工id
    String staffCode;//员工账户
    String staffName;//员工姓名
    String password;//员工密码
    String phone;//员工电话
    String address;//员工地址
    Integer deptNo;//部门编号
    String deptName;//部门名称
    Integer staffRole;//员工角色（系统管理员为1，普通管理员为2）
    Integer staffStatus;//员工状态 1正常 0封禁

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getStaffCode() {
        return staffCode;
    }

    public void setStaffCode(String staffCode) {
        this.staffCode = staffCode;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getDeptNo() {
        return deptNo;
    }

    public void setDeptNo(Integer deptNo) {
        this.deptNo = deptNo;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Integer getStaffRole() {
        return staffRole;
    }

    public void setStaffRole(Integer staffRole) {
        this.staffRole = staffRole;
    }

    public Integer getStaffStatus() {
        return staffStatus;
    }

    public void setStaffStatus(Integer staffStatus) {
        this.staffStatus = staffStatus;
    }
}
