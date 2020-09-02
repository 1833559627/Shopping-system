<%@ page contentType="text/html;charset=UTF-8" language="java" %><html >

<head>
    <title>订单详情</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/css/style.css" />
    <script src="${pageContext.request.contextPath }/js/jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${pageContext.request.contextPath }/js/bootstrap.js" type="text/javascript" charset="utf-8"></script>

    <body>
        <!-- content start -->
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="page-header" style="margin-bottom: 0px;">
                        <h3>订单详情</h3>
                        <input type="hidden" id="getOid" name="oid" value="${param.oid}">
                    </div>
                </div>
            </div>
            <div class="row head-msg">

                <div class="col-md-12">
                   订单: <b><span id="orderCode"></span></b>
                </div>

            </div>
            <table class="table table-hover table-striped table-bordered"id="orderDetails">

            </table>
        </div>
        <!-- content end-->
    </body>

    <script src="${pageContext.request.contextPath }/js/frontOrdersDetails.js" type="text/javascript" charset="utf-8"></script>

</html>
