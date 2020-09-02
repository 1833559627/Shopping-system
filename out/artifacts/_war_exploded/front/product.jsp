<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>商品列表</title>

        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.css" />
        <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css" />
        <link rel="stylesheet" href="${pageContext.request.contextPath }/iconfont/iconfont.css">
        <script src="${pageContext.request.contextPath }/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="${pageContext.request.contextPath }/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>
        <script src="${pageContext.request.contextPath}/js/bootstrap-paginator.js" type="text/javascript" ></script>
    </head>

    <body>
    <!-- content start -->
    <div class="container" id="a1">
        <div class="row">
            <div class="col-xs-12">
                <div class="page-header" style="margin-bottom: 0px;">
                    <input type="hidden" id="getUid" name="uid">
                    <h3>商品列表</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <form class="form-inline hot-search" id="doSearchFormId">
                    <input type="hidden" id="currentPageNo" name="currentPageNo">
                    <div class="form-group">
                        <label class="control-label">商品名称：</label>
                        <input type="text" class="form-control" id="productName" name="productName" placeholder="商品名称"/>
                    </div>
                    &nbsp;
                    <div class="form-group">
                        <label class="control-label">价格：</label>
                        <input type="text" class="form-control" placeholder="最低价格" id="low" name="low">--
                        <input type="text" class="form-control" placeholder="最高价格" id="high" name="high">
                    </div>
                    &nbsp;
                    <div class="form-group">
                        <label class="control-label">分类：</label>
                        <select class="form-control input-sm" id="typeSe" name="productType">
                            <%--ajax动态导入--%>
                        </select>
                    </div>
                    <button type="button" id="doSearchSubmit" class="btn btn-warning pull-right">
                        <i class="glyphicon glyphicon-search"></i>&nbsp;查询
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div class="content-back">
        <div class="container" id="a2">
            <div class="row" id="pDiv">
                <%--ajax动态导入--%>
            </div>

            <div>
                <ul id="productPage">
                </ul>
            </div>

        </div>
    </div>
    <!-- content end-->
    </body>
    <script src="${pageContext.request.contextPath }/js/frontProduct.js" type="text/javascript" charset="utf-8"></script>
</html>
