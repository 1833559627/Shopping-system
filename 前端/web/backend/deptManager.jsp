<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>backend</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>
</head>

<body>

    <!-- 部门管理 -->
    <div class="panel panel-default" id="departmentSet">
        <div class="panel-heading">
            <h3 class="panel-title">部门管理</h3>
        </div>
        <div class="panel-body">
            <input type="button" value="添加部门" class="btn btn-primary" id="doAddDept">
            <br>
            <br>
            <div class="modal fade" tabindex="-1" id="Dept">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">添加部门</h4>
                        </div>
                        <form id="addDeptId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="dept-name" class="col-sm-4 control-label">部门名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="dept-name" name="deptName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="dept-duty" class="col-sm-4 control-label">部门职能：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="dept-duty" name="deptFun" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id = "addDept">添加</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 添加子部门模态框 -->
             <div class="modal fade" tabindex="-1" id="sonDept">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">添加子部门</h4>
                        </div>
                        <form id="addSonDeptId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="dep-toName" class="col-sm-4 control-label">父部门名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="dep-toName" name="fDeptName" data-toggle="tooltip" readonly="readonly">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="dep-name" class="col-sm-4 control-label">部门名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="dep-name" name="deptName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="dep-duty" class="col-sm-4 control-label">部门职能：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control"  id="dep-duty" name="deptFun" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="addSonDept" >添加</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <!-- 修改部门模态框 -->
             <div class="modal fade" tabindex="-1" id="modifyDept">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">修改部门</h4>
                        </div>
                        <form id="modDeptId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="de-id" class="col-sm-4 control-label">id：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="de-id" name="did" data-toggle="tooltip" readonly="readonly">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="de-name" class="col-sm-4 control-label">部门名称：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="de-name" name="deptName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="de-duty" class="col-sm-4 control-label">部门职能：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="de-duty" name="deptFun" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary " id="modsDept">修改</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="show-list" id="tableInfo">
                <%--ajax动态写入--%>
            </div>

            <div>
                <ul id="productPage">
                </ul>
            </div>

        </div>
    </div>
</body>

    <script src="${pageContext.request.contextPath}/js/endDepartmentManager.js" type="text/javascript" ></script>

</html>