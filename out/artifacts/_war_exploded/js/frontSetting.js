$(function() {
    $("#frontMenu li").click(function () {
        if($(this).attr("tx")==1){
            $("#frontMenu li").removeClass("active");
            $(this).addClass("active");
        }
    });
});