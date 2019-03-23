var x = 1;
var y =1;
$(document).ready(function(){
  $(".all-project").css("display","none");
  $(".finish-project").css("display","none");

    $(".my-project1").on("click",function(){
      if(x==1){
        $(".img-my-project1").attr("src","img/projectwhite.svg");
        $(".my-project1").css("background-color", "#ADB7BB");
        $(".my-project1").css("color", "#ffffff");
        $(".all-project").css("display","block");
        $(".img-top1").attr("src","img/top.svg");
        x-=1;
      }else{
        $(".img-my-project1").attr("src","img/projectgreen.svg");
        $(".my-project1").css("background-color", "#C8D6D2");
        $(".my-project1").css("color", "#6C9395");
        $(".all-project").css("display","none");
        $(".img-top1").attr("src","img/up.svg");
        x+=1;
      }
    });

    $(".my-project2").on("click",function(){
      if(y==1){
        $(".img-my-project2").attr("src","img/task-completewhite.svg");
        $(".my-project2").css("background-color", "#ADB7BB");
        $(".my-project2").css("color", "#ffffff");
        $(".finish-project").css("display","block");
        $(".img-top2").attr("src","img/top.svg");
        y-=1;
      }else{
        $(".img-my-project2").attr("src","img/task-completegreen.svg");
        $(".my-project2").css("background-color", "#C8D6D2");
        $(".my-project2").css("color", "#6C9395");
        $(".finish-project").css("display","none");
        $(".img-top2").attr("src","img/up.svg");
        y+=1;
       
      }
    });
  });