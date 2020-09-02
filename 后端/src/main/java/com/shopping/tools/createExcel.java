package com.shopping.tools;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import com.shopping.pojo.Product;
import com.shopping.pojo.Staff;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class createExcel {

	public void createProductsSheet(OutputStream os, List<Product> list) throws IOException, RowsExceededException, WriteException{
		//创建工作簿
		WritableWorkbook workbook = Workbook.createWorkbook(os);
		//创建新的一页
		WritableSheet sheet = workbook.createSheet("商品信息", 0);
		//创建需要显示的内容，创建一个单元格，第一个参数为列坐标，第二个参数行坐标，第三个参数为内容
		//Label uid,username,pwd,phoneNo,sfzId;
		Label pid,productName,productPrice,productType,productStatus;
		pid = new Label(0,0,"序号");
		sheet.addCell(pid);
		productName = new Label(1,0,"商品名");
		sheet.addCell(productName);
		productPrice = new Label(2,0,"价格");
		sheet.addCell(productPrice);
		productType = new Label(3,0,"商品类型");
		sheet.addCell(productType);
		productStatus = new Label(4,0,"商品状态");
		sheet.addCell(productStatus);

		int row1 = 1;
		if(list!=null){
			for(Product product :list){
				pid = new Label(0,row1,String.valueOf(product.getPid()));
				sheet.addCell(pid);
				productName = new Label(1,row1,product.getProductName());
				sheet.addCell(productName);
				productPrice = new Label(2,row1,String.valueOf(product.getProductPrice()));
				sheet.addCell(productPrice);
				productType = new Label(3,row1,product.getProductTypeName());
				sheet.addCell(productType);
				if(product.getProductStatus()==1){
					productStatus = new Label(4,row1,"有效");
					sheet.addCell(productStatus);
				}else{
					productStatus = new Label(4,row1,"无效");
					sheet.addCell(productStatus);
				}

				row1++;
			}
		}
		//把创建的内容写入到输出流中，并关闭输出流
		workbook.write();
		workbook.close();
		os.close();
	}

	public void createStaffSheet(OutputStream os, List<Staff> list) throws IOException, RowsExceededException, WriteException{
		//创建工作簿
		WritableWorkbook workbook = Workbook.createWorkbook(os);
		//创建新的一页
		WritableSheet sheet = workbook.createSheet("管理员信息", 0);
		//创建需要显示的内容，创建一个单元格，第一个参数为列坐标，第二个参数行坐标，第三个参数为内容
		//Label uid,username,pwd,phoneNo,sfzId;
		Label sid,staffName,staffCode,phone,address,deptName,staffRole,staffStatus;
		sid = new Label(0,0,"序号");
		sheet.addCell(sid);
		staffName = new Label(1,0,"姓名");
		sheet.addCell(staffName);
		staffCode = new Label(2,0,"账号");
		sheet.addCell(staffCode);
		phone = new Label(3,0,"电话");
		sheet.addCell(phone);
		address = new Label(4,0,"地址");
		sheet.addCell(address);
		deptName = new Label(5,0,"部门");
		sheet.addCell(deptName);
		staffRole = new Label(6,0,"角色");
		sheet.addCell(staffRole);
		staffStatus = new Label(7,0,"状态");
		sheet.addCell(staffStatus);

		int row1 = 1;
		if(list!=null){
			for(Staff staff :list){
				sid = new Label(0,row1,String.valueOf(staff.getSid()));
				sheet.addCell(sid);
				staffName = new Label(1,row1,staff.getStaffName());
				sheet.addCell(staffName);
				staffCode = new Label(2,row1,String.valueOf(staff.getStaffCode()));
				sheet.addCell(staffCode);
				phone = new Label(3,row1,staff.getPhone());
				sheet.addCell(phone);
				address = new Label(4,row1,staff.getAddress());
				sheet.addCell(address);
				deptName = new Label(5,row1,staff.getDeptName());
				sheet.addCell(deptName);
				if(staff.getStaffRole()==1){
					staffRole = new Label(6,row1,"超级管理员");
				}else{
					staffRole = new Label(6,row1,"普通管理员");
				}
				sheet.addCell(staffRole);
				if(staff.getStaffStatus()==1){
					staffRole = new Label(7,row1,"有效");
				}else{
					staffRole = new Label(7,row1,"无效");
				}
				sheet.addCell(staffRole);

				row1++;
			}
		}
		//把创建的内容写入到输出流中，并关闭输出流
		workbook.write();
		workbook.close();
		os.close();
	}
	
}
