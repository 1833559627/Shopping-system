package com.shopping.service.staff;

import com.shopping.dao.staff.StaffMapper;
import com.shopping.pojo.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffMapper staffMapper;

    //后台登录
    public Staff login(Staff staff){
        return this.staffMapper.login(staff);
    }

}
