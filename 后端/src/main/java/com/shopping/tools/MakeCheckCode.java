package com.shopping.tools;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

public class MakeCheckCode {

	private char codeShow[] = {
		'a','b','c','d','e','f','g','h',	
		'i','g','k','l','m','n','o','p',
		'q','r','s','t','u','v','w','x',
		'y','z','0','1','2','3','4','5',
		'6','7','8','9'
	};
	
	public String getCode(int width,int height,OutputStream os){
		if(width<=0){
			width=60;
		}
		if(height<=0){
			height=32;
		}
		
		BufferedImage image = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
		//获取图形
		Graphics g = image.getGraphics();
		//生成随机类
		Random random = new Random();
		//设定背景色
		g.setColor(getRandColor(200,255));
		g.fillRect(0, 0, width, height);
		
		//画边框
		g.setColor(Color.black);
		g.drawRect(0, 0, width-1, height-1);
		
		//随机产出150条干扰线，避免被其他程序识别验证码
		g.setColor(getRandColor(150, 190));
		for(int i=0;i<150;i++){
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int x1 = random.nextInt(10);
			int y1 = random.nextInt(10);
			g.drawLine(x, y, x+x1, y+y1);
		}
		//随机产生验证码
		String checkCode = "";
		for(int i=0;i<4;i++){
			checkCode += codeShow[(int)(codeShow.length*Math.random())];
		}
		//设定验证码字符颜色
		g.setColor(new Color(20+random.nextInt(120),20+random.nextInt(120),20+random.nextInt(120)));
		//设定验证码字符的字体
		g.setFont(new Font("Atlantic Inline", Font.PLAIN, 20));
		//设定验证码中每一个字符的位置
		String str = checkCode.substring(0,1);
		g.drawString(str, 8, 15);
		str = checkCode.substring(1,2);
		g.drawString(str, 20, 17);
		str = checkCode.substring(2,3);
		g.drawString(str, 34, 19);
		str = checkCode.substring(3,4);
		g.drawString(str, 46, 15);
		
		//随机产生20个干扰点
		Random rand = new Random();
		for(int i=0;i<20;i++){
			int x= rand.nextInt(width);
			int y= rand.nextInt(height);
			g.drawOval(x, y, 1, 1);
		}
		//释放图形
		g.dispose();
		//输出图形到页面上
		try {
			ImageIO.write(image, "JPEG", os);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "";
		}
		return checkCode;
	}
	
	Color getRandColor(int fc,int bc){
		Random random = new Random();
		if(fc>255){
			fc=255;
		}
		if(bc>255){
			bc=255;
		}
		int r = fc+random.nextInt(bc-fc);
		int g = fc+random.nextInt(bc-fc);
		int b = fc+random.nextInt(bc-fc);
		return new Color(r,g,b);
	}
}
