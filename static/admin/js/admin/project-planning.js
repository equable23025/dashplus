var x = 1;
var y =1;
var this_board; 
var week_or_month = "week";
var this_date = new Date();
var is_in_board = false;
$(document).ready(function(){
    $(".movement").css("color","#333333");
    $(".movement").css("background-color","#ffffff");
    $(".focus").css("color","#ffffff");
    $(".focus").css("background-color","#4E78B9");
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
       if(!is_in_board){  scope_change(); }
      this_date = addDays(this_date, 7)
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = addDays(date, -recent_day+1);
      let formatted_date = start_date.getDate()+ "-" + months[start_date.getMonth()] + "-" + start_date.getFullYear()
      $(".txt-btn").text(formatted_date);
    }
    else{
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
       if(!is_in_board){         scope_change();      }
      this_date.setMonth(this_date.getMonth()+1);
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear();
      $(".txt-btn").text(formatted_date);
    }
    
  })
  $(".pre-btn").on("click",function(){
    if(week_or_month == "week"){
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
       if(!is_in_board){scope_change();}
      this_date = addDays(this_date, -7)
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = addDays(date, -recent_day+1);
      let formatted_date = start_date.getDate()+ "-" + months[start_date.getMonth()] + "-" + start_date.getFullYear()
      $(".txt-btn").text(formatted_date);
    }
    else{
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
      if(!is_in_board){         scope_change();      }
      this_date.setMonth(this_date.getMonth()-1);
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear();
      $(".txt-btn").text(formatted_date);
    }
  })

    if(!is_in_board){         scope_change();      }
  
  });
  function random_rgba() {
    var o = Math.floor(Math.random() * 255), r = Math.floor(Math.random() * 255), s = Math.floor(Math.random() * 255);
    return 'rgba(' + o + ',' + r + ',' + s + ',' + 0.4 + ')';
  }
  function scope_change(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/change_record/?username="+chk_user,
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

                    
                    for(let i=0; i<data.length; i++){
                        if(board.indexOf(data[i].board) == -1){
                            board.push(data[i].board);
                        }
                    }
                  
                    for(let i=0; i<board.length; i++){
                        // result2 = result.filter(function(b){
                        //     if(board[i].indexOf(b.board) != -1){
                        //         return b;
                        //     }
                        // });
                        timestamp_real = result.map(function(time){
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

                        
                        amount_change = result.map(function(amount){
                            return amount.amount_change;
                        });
                        
                        var amount_real = [];
                        var max = -999;
                        var max_axes;
                        for(let i = 0; i<amount_change.length; i++){
                            if(amount_change[i]>max){
                                max = amount_change[i];
                                max_axes = max;
                            }
                            amount_real.push(max);
                        }

                        amount_real = amount_real.filter(function(t, i){
                          return !!time_index[i] 
                        })

                        console.log(amount_real);
                        $(".percent_chart").append(`<section class="box-graph">
                        <div class="content_box">
                            <div class="box-canvas">
                                <canvas id="myChart`+i+`"></canvas>
                            </div>
                        </div>
                        </section>`);
                        var color = random_rgba();
                        var ctx = document.getElementById('myChart'+i).getContext('2d');
                            var chart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: time_date,
                                    datasets: [{
                                        label: 'Scope change',
                                        backgroundColor: [
                                            color,
                                            
                                        ],
                                        borderColor: [
                                            color,
                                            
                                        ],
                                        borderWidth: 1,
                                        data: amount_real
                                    }]
                                },
                                options: {
                                    responsive: true,
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
                                            scaleBeginAtZero : true,
                                        }],
                                        yAxes:[{
                                            display: true,
                                            ticks: {
                                                beginAtZero:true,
                                                min: 0,
                                                max: max_axes,
                                                stepSize: 1
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
                                });//chart

                        }//loop
                }
            });//second
            
         }
     });//first
  }

  function week(){
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var date = this_date;
    var recent_day = date.getDay();
    var start_date = addDays(date, -recent_day+1);
    var end_date = addDays(date, 7-recent_day);
    let formatted_date = start_date.getDate()+ "-" + months[start_date.getMonth()] + "-" + start_date.getFullYear()
    $(".week").css("background-color","#4E78B9");
    $(".week").css("color","#ffffff");
    $(".month").css("background-color","#ffffff");
    $(".month").css("color","#333333");
    week_or_month = "week";
    $(".txt-btn").text(formatted_date);
    if(!is_in_board){         scope_change();      }

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
    if(!is_in_board){         scope_change();      }
    console.log(start_date)
    console.log(end_date)
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  
  function next_month(){
    $(".txt-btn").text(formatted_date);
  }
  function prev_month(){
    $(".pre-btn")
    $(".txt-btn").text(formatted_date);
  }
  function next_week(){
    $(".next-btn")
    $(".txt-btn").text(formatted_date);
  }
  function next_month(){
    $(".pre-btn")
    $(".txt-btn").text(formatted_date);
  }