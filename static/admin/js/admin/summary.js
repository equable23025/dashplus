$(document).ready(function(){
  $(".s1").on("click",function(){
    $(".sum-box").empty();
    sum1_btn();
  });
  $(".s2").on("click",function(){
    $(".sum-box").empty();
    sum2_btn();
  });
  $(".s3").on("click",function(){
    $(".sum-box").empty(); 
    sum3_btn();
  });
  $(".s4").on("click",function(){
    $(".sum-box").empty(); 
    sum4_btn();
  });
  $(".s5").on("click",function(){
    $(".sum-box").empty(); 
    sum5_btn();
  });
});

function sum1_btn(){
    $(".sum-box").html(`
      <div class="content_box" hidden>
        <div class="sum1" >
            <div class="sum1_l"><img src="../../static/admin/img/sum1_txt.svg"></div>
            <div class="sum1_r"><img src="../../static/admin/img/s1.svg"></div>
        </div>
      </div>
      `);
      // alert(1);
      $(".s1").css("background-color","#ffffff");
      $(".s2").css("background-color","#696969");
      $(".s3").css("background-color","#696969");
      $(".s4").css("background-color","#696969");
      $(".s5").css("background-color","#696969");
      $(".content_box").fadeIn(1500);
      $(".s1").on("click",function(){
        $(".sum-box").empty();
        sum1_btn();
      });
      $(".s2").on("click",function(){
        $(".sum-box").empty();
        sum2_btn();
      });
      $(".s3").on("click",function(){
        $(".sum-box").empty(); 
        sum3_btn();
      });
      $(".s4").on("click",function(){
        $(".sum-box").empty(); 
        sum4_btn();
      });
      $(".s5").on("click",function(){
        $(".sum-box").empty(); 
        sum5_btn();
      });

}

function sum2_btn(){
    $(".sum-box").append(`
      <div class="content_box" hidden>
        <div class="sum1" >
            <div class="sum2_l"><img src="../../static/admin/img/sum2_txt.svg"></div>
            <div class="sum2_r"><img src="../../static/admin/img/s2.svg"></div>
        </div>
      </div>`);
      // alert(1);
      $(".s1").css("background-color","#696969");
      $(".s2").css("background-color","#ffffff");
      $(".s3").css("background-color","#696969");
      $(".s4").css("background-color","#696969");
      $(".s5").css("background-color","#696969");
      $(".content_box").fadeIn(1500);
      $(".s1").on("click",function(){
        $(".sum-box").empty();
        sum1_btn();
      });
      $(".s2").on("click",function(){
        $(".sum-box").empty(); 
        sum2_btn();
      });
      $(".s3").on("click",function(){
        $(".sum-box").empty(); 
        sum3_btn();
      });
      $(".s4").on("click",function(){
        $(".sum-box").empty(); 
        sum4_btn();
      });
      $(".s5").on("click",function(){
        $(".sum-box").empty(); 
        sum5_btn();
      });
}

function sum3_btn(){
    $(".sum-box").append(`
      <div class="content_box" hidden>
        <div class="sum1" >
            <div class="sum3_l"><img src="../../static/admin/img/s3.svg"></div>
            <div class="sum3_r"><img src="../../static/admin/img/sum3_txt.svg"></div>
        </div>
      </div>`);
      $(".s1").css("background-color","#696969");
      $(".s2").css("background-color","#696969");
      $(".s3").css("background-color","#ffffff");
      $(".s4").css("background-color","#696969");
      $(".s5").css("background-color","#696969");
      $(".content_box").fadeIn(1500);
      $(".s1").on("click",function(){
        $(".sum-box").empty();
        sum1_btn();
      });
      $(".s2").on("click",function(){
        $(".sum-box").empty(); 
        sum2_btn();
      });
      $(".s3").on("click",function(){
        $(".sum-box").empty(); 
        sum3_btn();
      });
      $(".s4").on("click",function(){
        $(".sum-box").empty(); 
        sum4_btn();
      });
      $(".s5").on("click",function(){
        $(".sum-box").empty(); 
        sum5_btn();
      });
}
function sum4_btn(){
  $(".sum-box").append(`
    <div class="content_box" hidden>
      <div class="sum1" >
          <div class="sum4_l"><img src="../../static/admin/img/s4.svg"></div>
          <div class="sum4_r"><img src="../../static/admin/img/sum4_txt.svg"></div>
      </div>
    </div>`);
      $(".s1").css("background-color","#696969");
      $(".s2").css("background-color","#696969");
      $(".s3").css("background-color","#696969");
      $(".s4").css("background-color","#ffffff");
      $(".s5").css("background-color","#696969");
    $(".content_box").fadeIn(1500);
    $(".s1").on("click",function(){
      $(".sum-box").empty();
      sum1_btn();
    });
    $(".s2").on("click",function(){
      $(".sum-box").empty(); 
      sum2_btn();
    });
    $(".s3").on("click",function(){
      $(".sum-box").empty(); 
      sum3_btn();
    });
    $(".s4").on("click",function(){
      $(".sum-box").empty(); 
      sum4_btn();
    });
    $(".s5").on("click",function(){
      $(".sum-box").empty(); 
      sum5_btn();
    });
}
function sum5_btn(){
  $(".sum-box").append(`
    <div class="content_box" hidden>
      <div class="sum1" >
          <div class="sum5_l"><img src="../../static/admin/img/s5.svg"></div>
          <div class="sum5_r">
            <img src="../../static/admin/img/sum5_txt.svg">
            <a href="/addboard">
              <div class="addboard_sum5">Add Board</div>
            </a>
          </div>
      </div>
    </div>`);
      $(".s1").css("background-color","#696969");
      $(".s2").css("background-color","#696969");
      $(".s3").css("background-color","#696969");
      $(".s4").css("background-color","#696969");
      $(".s5").css("background-color","#ffffff");
    $(".content_box").fadeIn(1500);
    $(".s1").on("click",function(){
      $(".sum-box").empty();
      sum1_btn();
    });
    $(".s2").on("click",function(){
      $(".sum-box").empty(); 
      sum2_btn();
    });
    $(".s3").on("click",function(){
      $(".sum-box").empty(); 
      sum3_btn();
    });
    $(".s4").on("click",function(){
      $(".sum-box").empty(); 
      sum4_btn();
    });
    $(".s5").on("click",function(){
      $(".sum-box").empty(); 
      sum5_btn();
    });
}
