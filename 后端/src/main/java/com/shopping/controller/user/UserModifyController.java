package com.shopping.controller.user;

import com.shopping.pojo.LifePhoto;
import com.shopping.pojo.User;
import com.shopping.service.user.UserService;
import com.shopping.tools.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.List;

@Controller
@RequestMapping(value = "/front/user")
public class UserModifyController {

    @Autowired
    private UserService userService;

    //通过uid获得用户信息
    @RequestMapping(value = "/getUserByUid")
    @ResponseBody
    public User getUserByUid(@RequestParam(value = "uid") Integer uid){
        return this.userService.getUserByUid(uid);
    }



    @RequestMapping(value = "/isPasswordTrue")
    @ResponseBody
    //原密码是否正确
    public int isPasswordTrue(@RequestParam(value = "uid") Integer uid,
                           @RequestParam(value = "password") String password){
        if(this.userService.getUserByUid(uid).getPassword().equals(password)){
            return 1;
        }else {
            return 0;
        }
    }

    @RequestMapping(value = "/modPassword")
    @ResponseBody
    //修改密码
    public int modPassword(@RequestParam(value = "uid") Integer uid,
                           @RequestParam(value = "password") String password,
                           @RequestParam(value = "newPassword") String newPassword){

        MD5 md5 = new MD5();
        String bPwd = md5.md5Change(password);
        String nPwd = md5.md5Change(newPassword);

        if(this.userService.getUserByUid(uid).getPassword().equals(bPwd)){
            //原密码是否正确
            return this.userService.modPassword(uid,nPwd);
        }else{
            return 0;
        }

    }

    @RequestMapping(value = "/modUserInfo")
    @ResponseBody
    //修改个人信息
    public int modUserInfo(@RequestParam(value = "uid") Integer uid,
                           @RequestParam(value = "userName") String userName,
                           @RequestParam(value = "phone") String phone,
                           @RequestParam(value = "userAddress") String userAddress,
                           HttpSession session, HttpServletRequest request){
        User user = this.userService.getUserByPhone(phone);
        if(user == null||user.getUid()==uid){

            int i = this.userService.modUserInfo(uid, userName, phone, userAddress);

            User xx= this.userService.getUserByUid(uid);
            session.removeAttribute("user");
            request.getSession().setAttribute("user",xx);
            return i;
        }else {
            return 0;
        }

    }

    //显示头像
    @RequestMapping(value = "/showAvatar")
    @ResponseBody
    public int showImage(@RequestParam(value = "uid") Integer uid,HttpServletResponse response) throws IOException {
        String pic = this.userService.getUserByUid(uid).getAvatar();
        if(pic.length()>0){

            File file = new File("M:\\shopping\\userAvatar\\"+pic+".jpg");
            //File file = new File("/root/shopping/userAvatar/"+pic+".jpg");
            InputStream in = new FileInputStream(file);
            byte[] bytearray = new byte[1024];
            while(in.read(bytearray)!=-1){
                response.getOutputStream().write(bytearray);
            }
            response.getOutputStream().flush();//必须清除流，否则图片不能正常显示
            in.close();
            return 1;
        }else{
            return 0;
        }
    }


    @RequestMapping("/downloadAvatar")
    @ResponseBody
    public  String readStream(@RequestParam(value = "uid") Integer uid) throws Exception {
        String pic = this.userService.getUserByUid(uid).getAvatar();
        //FileInputStream fs = new FileInputStream("/root/shopping/userAvatar/"+pic+".jpg");
        FileInputStream fs = new FileInputStream("M:\\shopping\\userAvatar\\"+pic+".jpg");
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while (-1 != (len = fs.read(buffer))) {
            outStream.write(buffer, 0, len);
        }
        outStream.close();
        fs.close();

        return Base64.getEncoder().encodeToString(outStream.toByteArray());
    }


    @RequestMapping(value="/uploadAvatar")
    @ResponseBody
    //上传头像
    public int uploadAvatar(@RequestParam("uid") Integer uid, @RequestParam("file") MultipartFile file, HttpSession session, HttpServletRequest request) throws IOException {
        if(!file.isEmpty()){
            String path = "M:\\shopping\\userAvatar";
            //String path = "/root/shopping/userAvatar";
            String avatar = uid+"_avatar";
            String fileName = avatar+".jpg";
            File dir = new File(path,fileName);
            if(!dir.exists()){
                dir.mkdirs();
            }

            file.transferTo(dir);


            int i = this.userService.modAvatar(uid, avatar);

            User user = this.userService.getUserByUid(uid);
            session.removeAttribute("user");
            request.getSession().setAttribute("user",user);

            return i;
        }else{
            return 0;
        }
    }

    //获取用户的生活照列表
    @RequestMapping(value="/getLifePhoto")
    @ResponseBody
    public List<LifePhoto> getLifePhotoListByUid(@RequestParam("uid") Integer uid){
        return this.userService.getLifePhotoListByUid(uid);
    }

    //显示生活照
    @RequestMapping(value = "/showLifePhoto")
    @ResponseBody
    public void showLifePhoto(@RequestParam(value = "pic") String pic,HttpServletResponse response) throws IOException {
        if(pic.length()>0){
            File file = new File("D:\\shopping\\lifePhoto\\"+pic+".jpg");
            //File file = new File("/root/shopping/lifePhoto/"+pic+".jpg");
            InputStream in = new FileInputStream(file);
            byte[] bytearray = new byte[1024];
            while(in.read(bytearray)!=-1){
                response.getOutputStream().write(bytearray);
            }
            response.getOutputStream().flush();//必须清除流，否则图片不能正常显示
            in.close();
        }
    }

    @RequestMapping(value="/uploadLp")
    @ResponseBody
    //上传生活照
    public int uploadLifePhoto(@RequestParam("uid") Integer uid,@RequestParam("file") MultipartFile file) throws IOException {

        int lastLifePhoto = this.userService.getLastLifePhoto(uid);

        if(!file.isEmpty()){
            String path = "D:\\shopping\\lifePhoto";
            //String path = "/root/shopping/lifePhoto";
            String pic =  uid+"_life_"+(lastLifePhoto+1);
            String fileName =pic+".jpg";
            File dir = new File(path,fileName);
            if(!dir.exists()){
                dir.mkdirs();
            }
            file.transferTo(dir);
            return this.userService.addLifePhoto(uid,pic);
        }else {
            return 0;
        }
    }

    @RequestMapping(value="/deleteLp")
    @ResponseBody
    //删除生活照
    public int deleteLifePhoto(@RequestParam("pic") String pic){

        String path = "M:\\shopping\\lifePhoto";
        //String path = "/root/shopping/lifePhoto";
        String fileName =pic+".jpg";
        File dir = new File(path,fileName);
        dir.delete();
        return this.userService.deleteLifePhoto(pic);
    }
}
