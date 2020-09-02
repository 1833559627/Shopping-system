package com.shopping.pojo;

public class Department {

    Integer did;//部门id
    String deptCode;//部门编号
    String deptName;//部门名称
    String deptFun;//部门职能描述
    Integer deptTo;//所属部门
    String deptToName;//所属部门名称
    int deptStatus;//部门状态1可用 0封禁

    public Integer getDid() {
        return did;
    }

    public void setDid(Integer did) {
        this.did = did;
    }

    public String getDeptCode() {
        return deptCode;
    }

    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptFun() {
        return deptFun;
    }

    public void setDeptFun(String deptFun) {
        this.deptFun = deptFun;
    }

    public Integer getDeptTo() {
        return deptTo;
    }

    public void setDeptTo(Integer deptTo) {
        this.deptTo = deptTo;
    }

    public String getDeptToName() {
        return deptToName;
    }

    public void setDeptToName(String deptToName) {
        this.deptToName = deptToName;
    }

    public int getDeptStatus() {
        return deptStatus;
    }

    public void setDeptStatus(int deptStatus) {
        this.deptStatus = deptStatus;
    }
}
