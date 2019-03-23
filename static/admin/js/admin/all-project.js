$(document).ready(function(){
  // $(".menu_box").on("click",function(){
  //   if ($(".main_menu").style.display === "block") {
  //     $(".main_menu").css("display" ,"none");
  //   }
  // })
  // $(".main_menu_bg").on("click",function(){
  //   if ($(".main_menu") === "none") {
  //     $(".main_menu").css("display" ,"block");
  //   }
  // })


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