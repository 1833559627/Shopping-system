<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<head>
    <title>管理员管理</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>
</head>

<body>
    <!-- 管理员管理 -->
    <div class="panel panel-default" id="adminSet">
        <div class="panel-heading">
            <h3 class="panel-title">管理员管理</h3>
        </div>
        <div class="panel-body">
            <div class="showmargersearch">
                <form class="form-inline" id="findStaff" enctype="multipart/form-data">
                    <input type="hidden" id="currentPageNo" name="currentPageNo">
				  <div class="form-group">
				    <label for="staffName">姓名:</label>
				    <input type="text" class="form-control" id="staffName" name="staffName" placeholder="请输入姓名">
				  </div>
				  <div class="form-group">
				    <label for="staffCode">帐号:</label>
				    <input type="text" class="form-control" id="staffCode" name="staffCode" placeholder="请输入帐号">
				  </div>
				  <div class="form-group">
				    <label for="phone">电话:</label>
				    <input type="text" class="form-control" id="phone" name="phone" placeholder="请输入电话">
				  </div>
				  <div class="form-group">
				    <label for="address">地址:</label>
				    <input type="text" class="form-control" id="address" name="address" placeholder="请输入地址">
				  </div>
				  <div class="form-group">
				    <label for="deptNo">部门</label>
	                    <select class="form-control" id="deptNo" name="deptNo">
	                        <%--<option value="-1">全部</option>
	                        <option value="1">---有效---</option>
	                        <option value="0">---无效---</option>
	                        ajax动态导入--%>
	                    </select>
				  </div>
				  <div class="form-group">
				    <label for="staffRole">角色</label>
	                    <select class="form-control" id="staffRole" name="staffRole">
	                        <option value="${null}">全部</option>
	                        <option value="1">超级管理员</option>
	                        <option value="2">普通管理员</option>
	                    </select>
				  </div>
				  <div class="form-group">
				    <label for="staffStatus">状态</label>
	                    <select class="form-control" id="staffStatus" name="staffStatus">
	                        <option value="${null}">全部</option>
	                        <option value="1">---有效---</option>
	                        <option value="2">---无效---</option>
	                    </select>
				  </div>
                </form>
				  <input type="button" value="查询" class="btn btn-primary" id="doStaffSearch">
                  <input type="button" value="导出查询的内容" class="btn btn-primary" id="getStaffExcel">
            </div>
            <br>
            <br>
            <input type="button" value="添加管理员" class="btn btn-primary" id="doAddManger">
            <!-- 添加管理员 -->
            <div class="modal fade" tabindex="-1" id="myMangerUser">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">添加管理员</h4>
                        </div>
                        <form id="addStaffId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="man-name" class="col-sm-4 control-label">用户姓名：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="man-name" name="staffName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="man-code" class="col-sm-4 control-label">登录帐号：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="man-code" name="staffCode" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="man-password" class="col-sm-4 control-label">登录密码：</label>
                                    <div class="col-sm-4">
                                        <input type="password" class="form-control" id="man-password" name="password" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="man-phone" class="col-sm-4 control-label">联系电话：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="man-phone" name="phone" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="man-address" class="col-sm-4 control-label">联系地址：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="man-address" name="address" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="man-dept" class="col-sm-4 control-label">部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</label>
                                    <div class=" col-sm-4">
                                        <select class="form-control" id="man-dept" name="deptNo" data-toggle="tooltip">
                                            <%--<option>请选择</option>
                                            <option>研发部</option>
                                            <option>市场部</option>--
                                            ajax动态写入--%>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div class="row text-right">
                                    <label for="man-role" class="col-sm-4 control-label">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</label>
                                    <div class=" col-sm-4">
                                        <select class="form-control" id="man-role" name="staffRole" data-toggle="tooltip">
                                            <option value="${0}">请选择</option>
                                            <option value="${1}">超级管理员</option>
                                            <option value="${2}">普通管理员</option>
                                        </select>
                                    </div>
                                </div>
                                <br>

                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-primary" id="addStaffs">添加</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 管理员修改 -->
            <div class="modal fade" tabindex="-1" id="myModal-Manger">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">管理员修改</h4>
                        </div>
                        <form id="modStaffId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="ManId" class="col-sm-4 control-label">id：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="ManId" name="sid" data-toggle="tooltip" readonly="readonly">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="ManName" class="col-sm-4 control-label">管理员姓名：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="ManName" name="staffName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="ManPhone" class="col-sm-4 control-label">联系电话：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="ManPhone" name="phone" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="ManAddress" class="col-sm-4 control-label">联系地址：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="ManAddress" name="address" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="ManDept" class="col-sm-4 control-label">部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</label>
                                    <div class=" col-sm-4">
                                        <select class="form-control" id="ManDept" name="deptNo" data-toggle="tooltip">
                                            <%--<option>请选择</option>
                                            <option>研发部</option>
                                            <option>市场部</option>
                                            ajax动态写入--%>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div class="row text-right">
                                    <label for="ManRole" class="col-sm-4 control-label">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</label>
                                    <div class=" col-sm-4">
                                        <select class="form-control" id="ManRole" name="staffRole" data-toggle="tooltip" >
                                            <option value="${0}">请选择</option>
                                            <option value="${1}">超级管理员</option>
                                            <option value="${2}">普通管理员</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-warning" id="modStaffs">修改</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="show-list" style="position: relative;top: 30px;" id="tableInfo">
                <%--ajax动态写入--%>
                <%--<table class="table table-bordered table-hover" style='text-align: center;'>
                    <thead>
                        <tr class="text-danger">
                            <th class="text-center">序号</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">帐号</th>
                            <th class="text-center">电话</th>
                            <th class="text-center">邮箱</th>
                            <th class="text-center">部门</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">角色</th>
                            <th class="text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody id="tb">
                        <tr>
                            <td>1</td>
                            <td>admin</td>
                            <td>admin</td>
                            <td>15996868058</td>
                            <td>江苏南京</td>
                            <td>研发部</td>
                            <td>有效</td>
                            <td>系统管理员</td>
                            <td class="text-center">
                                <input type="button" class="btn btn-warning btn-sm doMangerModify" value="修改">
                                <input type="button" class="btn btn-danger btn-sm doMangerDisable" value="禁用">
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>admin</td>
                            <td>admin</td>
                            <td>15996868058</td>
                            <td>江苏南京</td>
                            <td>研发部</td>
                            <td>无效</td>
                            <td>系统管理员</td>
                            <td class="text-center">
                                <input type="button" class="btn btn-warning btn-sm doMangerModify" value="修改">
                                <input type="button" class="btn btn-success btn-sm doMangerDisable" value="启用">
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>admin2</td>
                            <td>admin2</td>
                            <td>15996868058</td>
                            <td>江苏南京</td>
                            <td>研发部</td>
                            <td>无效</td>
                            <td>系统管理员</td>
                            <td class="text-center">
                                <input type="button" class="btn btn-warning btn-sm doMangerModify" value="修改">
                                <input type="button" class="btn btn-danger btn-sm doMangerDisable" value="禁用">
                            </td>
                        </tr>
                    </tbody>
                </table>--%>
            </div>
            <div>
                <ul id="staffPage"></ul>
            </div>
        </div>
    </div>
</body>

    <script src="${pageContext.request.contextPath}/js/endStaffManager.js" type="text/javascript" ></script>

</html>