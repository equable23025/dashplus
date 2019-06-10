var x = 1;
var y =1;
var this_board; 
var week_or_month = "week";
var this_date = new Date();
var is_in_board = false;
$(document).ready(function(){
    $(".planning").css("color","#ffffff");
    $(".planning").css("background-color","#4E78B9");
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
            effort_graph();      
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
              effort_graph();      
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
              effort_graph();      
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
                effort_graph();      
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
        effort_graph();      
    }
   
  });

  function random_rgba() {
    var o = Math.floor(Math.random() * 255), r = Math.floor(Math.random() * 255), s = Math.floor(Math.random() * 255);
    return 'rgba(' + o + ',' + r + ',' + s + ',' + 0.4 + ')';
  }
  
  function effort_graph(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/change_effort_record/?username="+chk_user,
        success: function(data){
            $.ajax({
                type: "GET",
                url: "http://127.0.0.1:8000/api/time_stamp/",
                success: function(data2){
                    $.ajax({
                        type: "GET",
                        url: "http://127.0.0.1:8000/api/card_storypoint/?username="+chk_user,
                        success: function(data3){
                    var result = data;
                    var result3 = data2;
                    var timestamp_real = []; 
                    var amount_change = [];
                    var board = [];  
                    var result4 = data3; 
                    var card_name = [];  
                    var storypoint = [];  
                    var board_story=[];
                    var time_story=[];
                    console.log(relation);

                    for(let i=0; i<data.length; i++){
                        if(board.indexOf(data[i].board) == -1){
                            board.push(data[i].board);
                        }
                    }
                    console.log(b)

                    for(let i=0; i<board.length; i++){
                        let now_board = board[i];
                        
                        result2 = result.filter(function(b){
                            if(board[i].indexOf(b.board) != -1){
                                return b;
                            }
                        });
                        result4 = result4.filter(function(b){
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
                    console.log(time_date);
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
                        amount_change = result.map(function(amount){
                            return amount.amount_change;
                        });
                       

                        amount_change = amount_change.filter(function(t, i){
                            return !!time_index[i] ;
                        })

                    
                        $(".percent_chart").append(`<section class="box-graph">
                        <div class="content_box">
                            <div class="box-canvas">
                                <canvas id="myChart`+i+`"></canvas>
                            </div>
                        </div>
                        </section>`);

                        //modal
                        var storytime_date=[];
                        for(let i = 0;i<data3.length;i++){
                            if(board[i] == data3[i].board){
                                card_name = result4.map(function(name){
                                    return name.card_name;
                                });
                                storypoint = result4.map(function(name){
                                    return name.storypoint;
                                });
                            }
                            if(time_story.indexOf(data3[i].timestamp) == -1){
                                time_story.push(data3[i].timestamp);
                            }
                        }
                        for(let i = 0;i<result3.length;i++){
                            if(time_story[i] == result3[i].id){
                                var date = result3[i].datetime.substr(0, 10);
                                storytime_date.push(date);
                            }
                        }
                        console.log("story "+storypoint);
                        console.log("cardname "+card_name);
                        console.log("time "+time_story);
                        console.log("storytime_date "+storytime_date);
                        
                        for(let i = 0;i<storytime_date.length;i++){
                            
                            filter_card_name = result4.filter(function(name){
                                return name.timestamp == time_story[i] 
                            });

                            filter_card_name = filter_card_name.map(function(name){
                                return name.card_name
                            });

                            filter_storypoint = result4.filter(function(name){
                                return name.timestamp == time_story[i] 
                            });

                            filter_storypoint = filter_storypoint.map(function(name){
                                return name.storypoint
                            });

                            console.log("filter_card_name "+filter_card_name);
                            
                            if(filter_card_name.length > 0){
                                $(".d-story").append(`<div class="date-story date-story`+now_board+` date-story`+now_board+i+`"><span id="time-stamp">`+storytime_date[i]+`</span><br>
                                </div>`)        
                            }
                            for(let j =0 ;j<filter_card_name.length;j++){
                                $(".date-story"+now_board+i).append(` <div class="card-name">Card name : <span id="c1">`+filter_card_name[j]+`</span> Size : <span id="s1">`+filter_storypoint[j]+`</span> , </div>`);
                            }
                           
                            $(".date-story"+now_board).hide()
                        }

                                    
                            //  $(".big_chart").append(`
                            //     <div class="box-chart-modal">
                            //     <canvas id="myChartModal`+i+`"></canvas>
                            //     </div>`); 
                                var color = random_rgba();
                                var ctx = document.getElementById('myChart'+i).getContext('2d');
                                var chart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: time_date,
                                        datasets: [{
                                            label: 'Effort change',
                                            backgroundColor: [
                                                color,
                                                
                                            ],
                                            borderColor: [
                                                color,
                                                
                                            ],
                                            borderWidth: 1,
                                            data: amount_change
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        legend : {
                                            position:'top',
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
                                                scaleLabel: { display: true, labelString: 'Day' },
                                                scaleBeginAtZero : true,
                                            }],
                                            yAxes:[{
                                                display: true,
                                                ticks: {
                                                    beginAtZero:true,
                                                    min: 0,
                                                    stepSize: 1,
                                                },
                                                scaleLabel: { display: true, labelString: 'No.Change' },
                                                scaleBeginAtZero : true,
                                            }]
                                        },
                                            elements: {
                                                line: {
                                                    tension: 0, // disables bezier curves
                                                }
                                            }
                                        }
                                });//chart_all


                                $(".big_chart").append(` <div class="box-chart-modal"><canvas id="myChartModal`+i+`"></canvas></div>`);
                                    $(".big_chart").hide();      
                                    $('#myChartModal'+i).hide();
                                    
                                $('#myChart'+i).on("click",function(){
                                    $(".big_chart").show();  
                                    $("#modal").hide();
                                    $("#modal").fadeIn(1000);
                                    $(".main_menu_bg").show();
                                    $('#myChartModal'+i).show();
                                    $(".date-story").hide()
                                    $('.date-story'+board[i]).show();
                                    
                                });//modal chart

                                $(".cancel-btn").on('click',function(){
                                    $("#modal").show();
                                    $("#modal").fadeOut(300);
                                    // $("#modal").hide();
                                    // $(".main_menu_bg").show();
                                    // $(".main_menu_bg").fadeOut(1500);
                                    $(".main_menu_bg").hide();
                                    $('#myChartModal'+i).hide();
                                    $(".big_chart").hide();  
                                });//cancel btn
                                
                               
                                var b_ctx = document.getElementById('myChartModal'+i).getContext('2d');
                                var chart = new Chart(b_ctx, {
                                    type: 'line',
                                    data: {
                                        labels: time_date,
                                        datasets: [{
                                            label: 'Effort change',
                                            backgroundColor: [
                                                'rgba(68, 153, 237,0.3)',
                                                
                                            ],
                                            borderColor: [
                                                'rgba(68, 153, 237,0.3)',
                                                
                                            ],
                                            borderWidth: 1,
                                            data: amount_change
                                        }]
                                    },
                                    options: {
                                        responsive: true,
                                        legend : {
                                            position:'top',
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
                                                scaleLabel: { display: true, labelString: 'Day' },
                                                scaleBeginAtZero : true,
                                            }],
                                            yAxes:[{
                                                display: true,
                                                ticks: {
                                                    beginAtZero:true,
                                                    min: 0,
                                                    stepSize: 1,
                                                },
                                                scaleLabel: { display: true, labelString: 'No.Change' },
                                                scaleBeginAtZero : true,
                                            }]
                                        },
                                            elements: {
                                                line: {
                                                    tension: 0, // disables bezier curves
                                                }
                                            }
                                        }
                                });   //modal_chart 

                                
                            }//loop

                        }
                    });//3
                }
            }); //2
         }
     });//1
  }


  function week(){
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var date = this_date;
    var recent_day = date.getDay();
    var start_date = addDays(date, -recent_day+1);
    var end_date = addDays(date, 7-recent_day);
    let formatted_date = start_date.getDate()+ "/" + months[start_date.getMonth()] + "/" + start_date.getFullYear()
    +" - "+ end_date.getDate()+ "/" + months[end_date.getMonth()] + "/" + end_date.getFullYear()
    $(".week").css("background-color","#4E78B9");
    $(".week").css("color","#ffffff");
    $(".month").css("background-color","#ffffff");
    $(".month").css("color","#333333");
    week_or_month = "week";
    $(".txt-btn").text(formatted_date);
    if(!is_in_board){         
        effort_graph();      
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
        effort_graph();      
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

  


