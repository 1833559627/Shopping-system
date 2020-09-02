<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>确认订单</title>
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
                        <h3>我的购物车</h3>
                        <input type="hidden" id="getUid" name="uid" value="${param.uid}">
                        <input type="hidden" id="getCart" name="uid" value="${param.checkItem}">
                    </div>
                </div>
            </div>
            <table class="table table-hover table-striped table-bordered" id="checkList">
                <%--ajax动态写入--%>
            </table>
        </div>
        <!-- content end-->
        <div class="modal fade" id="buildOrder" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">提示消息</h4>
          </div>
          <div class="orderMsg">
               <p>
          订单生成成功！！ 
              
          </p>
          <p>
          订单号：<span id="orderCode"></span>
              
          </p>
          </div>
        </div>
      </div>
    </div>

    </body>

    <script src="${pageContext.request.contextPath }/js/frontOrder.js" type="text/javascript" charset="utf-8"></script>
</html>
