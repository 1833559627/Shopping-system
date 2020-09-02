<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>

<head>
    <title>商品类别管理</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>


</head>

<body>
    <div class="panel panel-default" id="userSet">
        <div class="panel-heading">
            <h3 class="panel-title">商品类型管理</h3>
        </div>
        <div class="panel-body">
            <input type="button" value="添加商品类型" class="btn btn-primary" id="doAddProTpye">
            <div class="modal fade" tabindex="-1" id="ProductType">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">添加商品类型信息</h4>
                        </div>
                        <div class="modal-body text-center">
                            <div class="row text-right">
                                <label for="productTypeName" class="col-sm-4 control-label">类型名称：</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="productTypeName" name="productTypeName" data-toggle="tooltip">
                                </div>
                            </div>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary " id="addType">添加</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="show-list" id="tableInfo">

                <%--ajax动态写入--%>
                <!-- 添加: 分页 ul -->

            </div>

            <div>
                <ul id="productTypePage">
                </ul>
            </div>

            <div class="modal fade" tabindex="-1" id="myProductType">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">商品修改</h4>
                        </div>
                        <div class="modal-body text-center">
                            <div class="row text-right">
                                <label for="proTypeNum" class="col-sm-4 control-label">编号：</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="proTypeNum" name="proTypeNum" readonly/>
                                </div>
                            </div>
                            <br>
                            <div class="row text-right">
                                <label for="proTypeName" class="col-sm-4 control-label">类型名称</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" id="proTypeName" name="proTypeName" data-toggle="tooltip">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-warning " id="modB">修改</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

    <script src="${pageContext.request.contextPath}/js/endProductTypeManager.js" type="text/javascript" ></script>

</html>