<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>商品管理</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>
    <style>
    .file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        width: 100%;
        text-align: center;
    }

    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
    </style>
</head>

<body>
    <div class="panel panel-default" id="userPic">
        <div class="panel-heading">
            <h3 class="panel-title">商品管理</h3>
        </div>
        <div class="panel-body">
            <input type="button" value="添加商品" class="btn btn-primary" id="doAddPro">
            <input type="button" value="上传商品表格" class="btn btn-primary" id="getE">
            <input type="button" value="打印商品Excel" class="btn btn-primary" id="createExcel">
            <div class="modal fade" tabindex="-1" id="Product">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">添加商品</h4>
                        </div>
                        <form id="addId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="product-name" class="col-sm-4 control-label">商品名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="product-name" name="productName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="product-image" class="col-sm-4 control-label">商品图片：</label>
                                    <div class="col-sm-4">
                                        <a href="javascript:;" class="file" id="getPic" data-toggle="tooltip">选择文件
                                            <input type="file" id="product-image" name="productPic" accept="image/jpg,image/jpeg,image/png,image/bmp" >
                                        </a>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="product-price" class="col-sm-4 control-label">商品价格：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="product-price" name="productPrice" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="product-type" class="col-sm-4 control-label">商品类型：</label>
                                    <div class="col-sm-4">
                                        <select class="form-control" id="product-type" name="productType" data-toggle="tooltip" onmousedown="if(this.options.length>3){this.size=6}" onblur="this.size=0" onchange="this.size=0">
                                            <%--ajax动态写入--%>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="product-des" class="col-sm-4 control-label" >商品描述：</label>
                                    <div class="col-sm-4">
                                        <textarea class="form-control" id="product-des" name="productDes"  data-toggle="tooltip"></textarea>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="addP">添加</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" tabindex="-1" id="addExcel">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">上传表格</h4>
                        </div>
                        <form id="addExcelId" enctype="multipart/form-data">
                            <div class="modal-body text-center">


                                <div class="row text-right">
                                    <label for="excelFile" class="col-sm-4 control-label" >商品表格：</label>
                                    <div class="col-sm-4">
                                        <a href="javascript:;" class="file" id="getFile" data-toggle="tooltip">选择文件
                                            <input type="file" name="file" id="excelFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="getXMM">提交</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>




            <br>
            <br>
            <div class="show-list" id="tableInfo">
                <%--ajax动态写入--%>
            </div>

            <div>
                <ul id="productPage">
                </ul>
            </div>





            <div class="modal fade" tabindex="-1" id="myProduct">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">商品修改</h4>
                        </div>
                        <form id="modId" enctype="multipart/form-data">
                            <div class="modal-body text-center">

                                <div class="row text-right">
                                    <label for="pro-num" class="col-sm-4 control-label">序号：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="pro-num" name="pid" readonly>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="pro-name" class="col-sm-4 control-label">商品名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="pro-name" name="productName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="pro-image" class="col-sm-4 control-label">商品图片：</label>
                                    <div class="col-sm-4">
                                        <a href="javascript:;" class="file">选择文件
                                            <input type="file" name="productPic" id="pro-image">
                                        </a>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="pro-price" class="col-sm-4 control-label">商品价格：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="pro-price" name="productPrice" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="pro-type" class="col-sm-4 control-label">商品类型：</label>
                                    <div class="col-sm-4">
                                        <select class="form-control" id="pro-type" name="productType" data-toggle="tooltip"  onmousedown="if(this.options.length>3){this.size=6}" onblur="this.size=0" onchange="this.size=0">
                                            <%--ajax动态写入--%>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="pro-des" class="col-sm-4 control-label" >商品描述：</label>
                                    <div class="col-sm-4">
                                        <textarea class="form-control" id="pro-des" name="productDes"  data-toggle="tooltip"></textarea>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="modP">修改</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

    <script src="${pageContext.request.contextPath}/js/endProductManager.js" type="text/javascript" ></script>


</html>