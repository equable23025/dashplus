var x = 1;
var y =1;
$(document).ready(function(){
  $(".menu_box").on("click",function(){
    $(".main_menu").show();
  });
  $(".menu_bg").on("click",function(){
    $(".main_menu").hide();
  });
  $(".all-project").css("display","none");
  $(".finish-project").css("display","none");

  $(".planning").on("click",function(){
    $(".planning").css("background-color","#4E78B9");
    $(".planning").css("color","#ffffff");
    $(".focus").css("background-color","#ffffff");
    $(".focus").css("color","#333333");
  })
  $(".focus").on("click",function(){
    $(".focus").css("background-color","#4E78B9");
    $(".focus").css("color","#ffffff");
    $(".planning").css("background-color","#ffffff");
    $(".planning").css("color","#333333");
  })
  $(".week").on("click",function(){
    $(".week").css("background-color","#4E78B9");
    $(".week").css("color","#ffffff");
    $(".month").css("background-color","#ffffff");
    $(".month").css("color","#333333");
  })
  $(".month").on("click",function(){
    $(".month").css("background-color","#4E78B9");
    $(".month").css("color","#ffffff");
    $(".week").css("background-color","#ffffff");
    $(".week").css("color","#333333");
  })

  $(".add-newproject-btn").on("click",function(){
    $(".accept-btn").on("click",function(){
      
      $(".hs-box").append('<a href="">'+
      '<section class="asset_page_group ">'+
      '<img class="img-setting img-opacity" src="img/setting.svg">'+
      '<div class="txt-bar">'+project_name+'</div></section>'+
      '</a>');
    });
  });
  
  

  });