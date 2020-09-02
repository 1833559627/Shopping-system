package com.shopping.tools;

import com.shopping.pojo.Product;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.List;

public class ReadExcel {

    public List<Product> addProductExcel(MultipartFile file) throws Exception {

        List<Product> productList = new ArrayList<>();

        String fileName = file.getOriginalFilename();// 获取文件名

        Workbook workbook = null;

        if(fileName.matches("^.+\\.(?i)(xls)$")){
            workbook = new HSSFWorkbook(file.getInputStream());

        } else if(fileName.matches("^.+\\.(?i)(xlsx)$")){
            workbook = new XSSFWorkbook(file.getInputStream());
        }

        Sheet sheet = workbook.getSheetAt(0); // 从工作区中取得页（Sheet）
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {// 循环打印Excel表中的内容
            Product product = new Product();

            Cell cell1 = sheet.getRow(i).getCell(1);
            cell1.setCellType(Cell.CELL_TYPE_STRING);

            Cell cell2 = sheet.getRow(i).getCell(2);
            cell2.setCellType(Cell.CELL_TYPE_STRING);

            Cell cell3 = sheet.getRow(i).getCell(3);
            cell3.setCellType(Cell.CELL_TYPE_STRING);

            Cell cell4 = sheet.getRow(i).getCell(4);
            cell4.setCellType(Cell.CELL_TYPE_STRING);

            Cell cell5 = sheet.getRow(i).getCell(5);
            cell5.setCellType(Cell.CELL_TYPE_STRING);

            String productName = cell1.getStringCellValue();
            float productPrice = Float.parseFloat(cell2.getStringCellValue());
            String productTypeName = cell3.getStringCellValue();
            String productStatus = cell4.getStringCellValue();
            String productDes = cell5.getStringCellValue();

            product.setProductName(productName);
            product.setProductPrice(productPrice);
            product.setProductTypeName(productTypeName);
            if(productStatus.equals("有效")){
                product.setProductStatus(1);
            }else{
                product.setProductStatus(0);
            }
            product.setProductDes(productDes);

            productList.add(product);
        }
        return productList;
    }
}
