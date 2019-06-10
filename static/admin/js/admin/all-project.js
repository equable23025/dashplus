
var x = 1;
var y =1;
var this_board; 
var week_or_month = "week";
var this_date = new Date();
var is_in_board = false;
$(document).ready(function(){
        $(".movement").css("color","#ffffff");
        $(".movement").css("background-color","#4E78B9");
        $(".focus").css("color","#333333");
        $(".focus").css("background-color","#ffffff");
        $(".planning").css("color","#333333");
        $(".planning").css("background-color","#ffffff");
        $(".menu_box").on("click",function(){
            $(".main_menu").show();
            $(".main_menu_bg").show();
          });
          $(".menu_bg").on("click",function(){
            $(".main_menu").hide();
            $(".main_menu_bg").hide();
          });
        
          $(".next-btn").on("click",function(){
            if(week_or_month == "week"){
              const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              $(".percent_chart").empty();
              if(!is_in_board){         
                  movement_graph();      
                }
            //   this_date = addDays(this_date, 7)
            //   var date = this_date;
            //   var recent_day = date.getDay();
            //   var start_date = addDays(date, -recent_day+1);
            //   let formatted_date = start_date.getDate()+ "-" + months[start_date.getMonth()] + "-" + start_date.getFullYear()
            //   $(".txt-btn").text(formatted_date);
            }
            else{
              const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              $(".percent_chart").empty();
              if(!is_in_board){         
                  movement_graph();      
                }
            //   this_date.setMonth(this_date.getMonth()+1);
            //   var date = this_date;
            //   var recent_day = date.getDay();
            //   var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
            //   let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear();
            //   $(".txt-btn").text(formatted_date);
            }
            
          })
          $(".pre-btn").on("click",function(){
            if(week_or_month == "week"){
              const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              $(".percent_chart").empty();
              if(!is_in_board){         
                  movement_graph();      
                }
            //   this_date = addDays(this_date, -7)
            //   var date = this_date;
            //   var recent_day = date.getDay();
            //   var start_date = addDays(date, -recent_day+1);
            //   let formatted_date = start_date.getDate()+ "-" + months[start_date.getMonth()] + "-" + start_date.getFullYear()
            //   $(".txt-btn").text(formatted_date);
            }
            else{
              const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              $(".percent_chart").empty();
              if(!is_in_board){         
                  movement_graph();      
                }
            //   this_date.setMonth(this_date.getMonth()-1);
            //   var date = this_date;
            //   var recent_day = date.getDay();
            //   var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
            //   let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear();
            //   $(".txt-btn").text(formatted_date);
            }
          })
        
        if(!is_in_board){         
            movement_graph();      
        }
  

});
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
function movement_graph(){
    //movement
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/change_movement_record/?username="+chk_user,
        success: function(data){
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:8000/api/time_stamp/",
                success: function(data2){
                    var result = data;
                    var result2 ;
                    var result3 = data2;
                    var timestamp_real = []; 
                    var amount_change = [];
                    var board = [];   
                    console.log(chk_user);
                    
                    for(let i=0; i<data.length; i++){
                        if(board.indexOf(data[i].board) == -1){
                            board.push(data[i].board);
                        }
                    }
                    
                    console.log(board);
                    for(let i=0; i<board.length; i++){
                        result2 = result.filter(function(b){
                            if(board[i].indexOf(b.board) != -1){
                                return b;
                            }
                        });
                        
                      timestamp_real = result2.map(function(time){
                          return time.timestamp;
                      });
      
                      var timestamp = [];
                      for(let i=1 ;i<=timestamp_real.length;i++){
                          timestamp.push(i);
                      }
                      var time_date = [];
                      for(let i = 0;i<result3.length;i++){
                          if(timestamp[i] == result3[i].id){
                              var date = result3[i].datetime.substr(0, 10);
                              time_date.push(date);
                          }
                      }
                      
                      var date = this_date;
                      var recent_day = date.getDay();
                      if(week_or_month == "week"){
                        var start_date = addDays(date, -recent_day+1);
                        var end_date = addDays(date, 7-recent_day);
                      }
                      else{
                        var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
                        var end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                      }
  
                      start_date.setHours(0,0,0,0)
                      end_date.setHours(0,0,0,0)
  
                      time_index = time_date.map(function(t, i){
                        if(new Date(t) >= new Date(start_date) && new Date(t) <= new Date(end_date)){
                          return 1;
                        }
                      }) 
                      console.log(time_index) 
                      
                      time_date = time_date.filter(function(t, i){
                        return !!time_index[i] 
                      })  
                      
                      console.log(time_date);
  
                        planning_doing = result2.map(function(amount){
                            return amount.planning_doing;
                        });
                        planning_doing = planning_doing.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        planning_testing = result2.map(function(amount){
                            return amount.planning_testing;
                        });
                        planning_testing = planning_testing.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        planning_done = result2.map(function(amount){
                            return amount.planning_done;
                        });
                        planning_done = planning_done.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        doing_planning = result2.map(function(amount){
                            return amount.doing_planning;
                        });
                        doing_planning = doing_planning.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        doing_testing = result2.map(function(amount){
                            return amount.doing_testing;
                        });
                        doing_testing = doing_testing.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        doing_done = result2.map(function(amount){
                            return amount.doing_done;
                        });
                        doing_done = doing_done.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        testing_planning = result2.map(function(amount){
                            return amount.testing_planning;
                        });
                        testing_planning = testing_planning.filter(function(t,i){
                          return !!time_index[i] 
                       });
  
                        testing_doing = result2.map(function(amount){
                            return amount.testing_doing;
                        });
                        testing_doing = testing_doing.filter(function(t,i){
                          return !!time_index[i] 
                        });
  
                        testing_done = result2.map(function(amount){
                            return amount.testing_done;
                        });
                        testing_done = testing_done.filter(function(t,i){
                          return !!time_index[i] 
                        });
  
                        done_planning = result2.map(function(amount){
                            return amount.done_planning;
                        });
                        done_planning = done_planning.filter(function(t,i){
                          return !!time_index[i] 
                        });
  
                        done_doing = result2.map(function(amount){
                            return amount.done_doing;
                        });
                        done_doing = done_doing.filter(function(t,i){
                          return !!time_index[i] 
                        });
  
                        done_testing = result2.map(function(amount){
                            return amount.done_testing;
                        });
                        done_testing = done_testing.filter(function(t,i){
                          return !!time_index[i] 
                        });
                        
  
                        $(".percent_chart").append(`<section class="box-graph">
                        <div class="content_box">
                            <div class="box-canvas">
                                <canvas id="myChart`+i+`"></canvas>
                               <input class="input-color" type="color" name="color-picker" value="#4E78B9">
                                    <select class="custom-select" style="width:200px; height:50px; width: 140px; height: 40px; margin-top: 10px; border: none; border-radius: unset; font-size: 12px;">
                                        <option>Select color</option>
                                        <option value="Planning-doing">Planning-doing</option>
                                        <option value="Planning-testing">Planning-testing</option>
                                        <option value="Planning-done">Planning-done</option>
                                        <option value="Doing_planning">Doing_planning</option>
                                        <option value="Doing_testing">Doing_testing</option>
                                        <option value="Doing-done">Doing-done</option>
                                        <option value="Testing-planning">Testing-planning</option>
                                        <option value="Testing-doing">Testing-doing</option>
                                        <option value="Testing-done">Testing-done</option>
                                        <option value="Done-planning">Done-planning</option>
                                        <option value="Done-doing">Done-doing</option>
                                        <option value="Done-testing">Done-testing</option>
                                    </select>
                            </div>
                        </div>
                        </section>`);
                        
                        var color = random_rgba();
                        var ctx = document.getElementById('myChart'+i).getContext('2d');
                        var chart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: time_date,
                                borderDash: [2, 2],
                                datasets: [{
                                    label: 'Planning-doing',
                                    borderColor: [
                                        "rgba(133, 191, 191)",
                                        
                                    ],
                                    
                                      borderWidth: 3,
                                    data: planning_doing,
                                    legend : {
                                        display : true
                                    }
                                    },{
                                        borderDash: [2, 1],
                                        label: 'Planning-testing',
                                        borderColor: [
                                            "rgba(23, 130, 191)",
                                            
                                        ],
                                       
                                          borderWidth: 3,
                                        data: planning_testing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Planning-done',
                                        
                                        borderColor: [
                                            "rgba(63, 127, 191)",
                                            
                                        ],
                                          borderWidth: 3,
                                        data: planning_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing_planning',
                                        
                                        borderColor: [
                                            "#00E2FF",
                                            
                                        ],
                                          borderWidth: 3,
                                        data: doing_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing_testing',
                                       
                                        borderColor: [
                                            "#A776D8",
                                            
                                        ],
                                          borderWidth: 3,
                                        data: doing_testing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing-done',
                                        
                                        borderColor: [
                                            "rgba(187, 187, 62)",
                                            
                                        ],
                                          borderWidth: 3,
                                        data: doing_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-planning',
                                        
                                        borderColor: [
                                            "rgba(183, 119, 10 )",
                                            
                                        ],
                                          borderWidth: 3,
                                        data: testing_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-doing',
                                        
                                        borderColor: [
                                            "rgba(187, 62, 187 )",
                                            
                                        ],
                                         borderWidth: 3,
                                        data: testing_doing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-done',
                                        
                                        borderColor: [
                                            "rgba(63, 191, 191 )",
                                            
                                        ],
                                         borderWidth: 3,
                                        data: testing_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Done-planning',
                                        
                                        borderColor: [
                                            "rgba(191, 63, 63 )",
                                            
                                        ],
                                         borderWidth: 3,
                                        data: done_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Done-doing',
                                       
                                        borderColor: [
                                            "rgba(63, 63, 191 )",
                                            
                                        ],
                                         borderWidth: 3,
                                        data: done_doing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        
                                        label: 'Done-testing',
                                        
                                        borderColor: [
                                            "rgba(127, 191, 63 )",
                                            
                                        ],
                                         borderWidth: 3,
                                        data: done_testing,
                                        legend : {
                                            display : false
                                        }
                                        
                                    },
                            
                                ]
                            },
                            options: {
                                responsive: true,
                                legend : {
                                        position:'right',
                                        labels: {
                                            boxWidth: 10,
                                            boxHeight: 2,
                                            fontSize:10
                                            
                                        },
                                        onHover: function(event, legendItem) {
                                            document.getElementById('myChart'+i).style.cursor = 'pointer';
                                          },
                                          onClick: function(e, legendItem) {
                                            var index = legendItem.datasetIndex;
                                            var ci = this.chart;
                                            var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
                                  
                                            ci.data.datasets.forEach(function(e, i) {
                                              var meta = ci.getDatasetMeta(i);
                                  
                                              if (i !== index) {
                                                if (!alreadyHidden) {
                                                  meta.hidden = meta.hidden === null ? !meta.hidden : null;
                                                } else if (meta.hidden === null) {
                                                  meta.hidden = true;
                                                }
                                              } else if (i === index) {
                                                meta.hidden = null;
                                              }
                                            });
                                  
                                            ci.update();
                                          },
                                },
                                title: {
                                    display: true,
                                    text: b[i]
                                },
                                scales: {
                                    xAxes: [{
                                        display: true,
                                        ticks: {
                                            beginAtZero:true,
                                            
                                        },
                                        scaleLabel: { display: true, labelString: 'Date' },
                                        scaleBeginAtZero : true
                                    }],
                                    yAxes:[{
                                        display: true,
                                        ticks: {
                                            beginAtZero:true,
                                            min: 0,
                                            stepSize: 1,
                                        },
                                        scaleLabel: { display: true, labelString: 'No.Change' },
                                        scaleBeginAtZero : true
                                    }]
                                },
                                    elements: {
                                        line: {
                                            tension: 0, 
                                        }
                                    }
                                }
                        });
                    }
                }
            });
          }
      });
}
function week(){
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var date = this_date;
    var recent_day = date.getDay();
    var start_date = addDays(date, -recent_day+1);
    var end_date = addDays(date, 7-recent_day);
    let formatted_date = start_date.getDate()+ "/" + months[start_date.getMonth()] + "/" + start_date.getFullYear()
    +" - "+ end_date.getDate()+ "/" + months[end_date.getMonth()] + "/" + end_date.getFullYear()
    $(".week").css("color","#ffffff");
    $(".month").css("background-color","#ffffff");
    $(".month").css("color","#333333");
    week_or_month = "week";
    $(".txt-btn").text(formatted_date);
    if(!is_in_board){         
        movement_graph();      
    }

    console.log(start_date)
    console.log(end_date)
  }
  
  function month(){
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var date = this_date;
    var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
    var end_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear()
    $(".month").css("background-color","#4E78B9");
    $(".month").css("color","#ffffff");
    $(".week").css("background-color","#ffffff");
    $(".week").css("color","#333333");
    week_or_month = "month";  
    $(".txt-btn").text(formatted_date);
    if(!is_in_board){         
        movement_graph();      
    }

    console.log(start_date)
    console.log(end_date)
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
//   function next_month(){
//     $(".txt-btn").text(formatted_date);
//   }
//   function prev_month(){
//     $(".pre-btn")
//     $(".txt-btn").text(formatted_date);
//   }
//   function next_week(){
//     $(".next-btn")
//     $(".txt-btn").text(formatted_date);
//   }
//   function next_month(){
//     $(".pre-btn")
//     $(".txt-btn").text(formatted_date);
//   }