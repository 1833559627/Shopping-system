<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh">

<head>
    <title>后台用户管理</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/bootstarp/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/index.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/bootstarp/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/userSetting.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>
</head>

<body>
    <div class="panel panel-default" id="userInfo" id="homeSet">
        <div class="panel-heading">
            <h3 class="panel-title">用户管理</h3>
        </div>
        <div class="panel-body">
            <div class="showusersearch">
                <form class="form-inline" id="findUser" enctype="multipart/form-data">
                    <input type="hidden" id="currentPageNo" name="currentPageNo">
				  <div class="form-group">
				    <label for="userName">姓名:</label>
				    <input type="text" class="form-control" id="userName" name="userName" placeholder="请输入姓名">
				  </div>
				  <div class="form-group">
				    <label for="userCode">帐号:</label>
				    <input type="text" class="form-control" id="userCode" name="userCode" placeholder="请输入帐号">
				  </div>
				  <div class="form-group">
				    <label for="phone">电话:</label>
				    <input type="text" class="form-control" id="phone" name="phone" placeholder="请输入电话">
				  </div>
				  <div class="form-group">
				    <label for="address">地址:</label>
				    <input type="text" class="form-control" id="address" name="userAddress" placeholder="请输入地址">
				  </div>
				  <div class="form-group">
				    <label for="userStatus">状态</label>
	                    <select class="form-control" id="userStatus" name="userStatus">
	                        <option value="${null}">全部</option>
	                        <option value="${1}">---有效---</option>
	                        <option value="${2}">---无效---</option>
	                    </select>
				  </div>
                </form>
				  <input type="button" value="查询" class="btn btn-primary" id="doUserSearch">
            </div>
            <div class="show-list" style="position: relative;top: 30px;" id="tableInfo">
                <%--ajax动态写入--%>
            </div>

            <div>
                <ul id="userPage"></ul>
            </div>

            <div class="modal fade" tabindex="-1" id="myModal">
                <!-- 窗口声明 -->
                <div class="modal-dialog modal-lg">
                    <!-- 内容声明 -->
                    <div class="modal-content">
                        <!-- 头部、主体、脚注 -->
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">用户修改</h4>
                        </div>
                        <form id="modUserId" enctype="multipart/form-data">
                            <div class="modal-body text-center">
                                <div class="row text-right">
                                    <label for="uid" class="col-sm-4 control-label">编号：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="uid" name="uid" data-toggle="tooltip" readonly>
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="uName" class="col-sm-4 control-label">姓名：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="uName" name="userName" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="uPhone" class="col-sm-4 control-label">电话：</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="uPhone" name="phone" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                                <div class="row text-right">
                                    <label for="uAddress" class="col-sm-4 control-label">地址：</label>
                                    <div class="col-sm-4">
                                        <input type="email" class="form-control" id="uAddress" name="userAddress" data-toggle="tooltip">
                                    </div>
                                </div>
                                <br>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button class="btn btn-warning" id="modUsers">修改</button>
                            <button class="btn btn-primary cancel" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

    <script src="${pageContext.request.contextPath}/js/endUserManager.js" type="text/javascript" ></script>

</html>