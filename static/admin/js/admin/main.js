var x = 1;
var y =1;
var this_board; 
var week_or_month = "week";
var this_date = new Date();
var is_in_board = false;
$(document).ready(function(){
  week();
  $(".menu_box").on("click",function(){
    $(".main_menu").show();
    $(".main_menu_bg").show();
  });
  $(".menu_bg").on("click",function(){
    $(".main_menu").hide();
    $(".main_menu_bg").hide();
  });
  for(let i=0;i<b.length;i++){
    $(".board_list").append(`<div class="menu_list board_index" data-index=`+i+`>
    <div class="content_box">
        `+b[i]+`
    </div>
    </div>`);
  }

  $(".board_index").on("click", function(){
    $(".option_box2").hide();
    $(".header-page").text(b[$(this).attr("data-index")]);
    this_board = $(this).attr("data-index");
    $(".percent_chart").empty();
    is_in_board = true;
    all_board(this_board);
  })

  $(".all-project").css("display","none");
  $(".finish-project").css("display","none");

  $(".week").on("click",function(){
    week();
    
  })
  $(".month").on("click",function(){
    month();
  })
  
  $(".next-btn").on("click",function(){
    if(week_or_month == "week"){
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
      if(is_in_board){
        all_board(this_board);
     }
      this_date = addDays(this_date, 7)
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = addDays(date, -recent_day+1);
      let formatted_date = start_date.getDate()+ "/" + months[start_date.getMonth()] + "/" + start_date.getFullYear()
    +" - "+ end_date.getDate()+ "/" + months[end_date.getMonth()] + "/" + end_date.getFullYear()
      $(".txt-btn").text(formatted_date);
    }
    else{
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
      if(is_in_board){
        all_board(this_board);
     }
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
      if(is_in_board){
        all_board(this_board);
     }
      this_date = addDays(this_date, -7)
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = addDays(date, -recent_day+1);
      let formatted_date = start_date.getDate()+ "/" + months[start_date.getMonth()] + "/" + start_date.getFullYear()
    +" - "+ end_date.getDate()+ "/" + months[end_date.getMonth()] + "/" + end_date.getFullYear()
      $(".txt-btn").text(formatted_date);
    }
    else{
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      $(".percent_chart").empty();
      if(is_in_board){
        all_board(this_board);
     }
      this_date.setMonth(this_date.getMonth()-1);
      var date = this_date;
      var recent_day = date.getDay();
      var start_date = new Date(date.getFullYear(), date.getMonth(), 1);
      let formatted_date =  months[start_date.getMonth()] + " " + start_date.getFullYear();
      $(".txt-btn").text(formatted_date);
    }
  })

});


  function all_board(index){
    $(".percent_chart").empty();
    $(".percent_chart").append(`<section class="box-graph">
    <div class="content_box">
        <div class="box-canvas">
            <canvas id="myChart`+0+`"></canvas>
        </div>
    </div>
    </section>`);

    $(".percent_chart").append(`<section class="box-graph">
    <div class="content_box">
        <div class="box-canvas">
            <canvas id="myChart`+1+`"></canvas>
        </div>
    </div>
    </section>`);

    $(".percent_chart").append(`<section class="box-graph">
    <div class="content_box">
        <div class="box-canvas">
            <canvas id="myChart`+2+`"></canvas>
        </div>
    </div>
    </section>`);
    //scope
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

                    board.push(relation[index]);
                    
                    // for(let i=0; i<data.length; i++){
                    //     if(board.indexOf(data[i].board) == -1){
                    //         board.push(data[i].board);
                    //     }
                    // }
                  
                    for(let i=0; i<board.length; i++){
                        
                        console.log(board[i])
                        result2 = result.filter(function(b){
                            if(board[i].indexOf(b.board) != -1){
                                return b;
                            }
                        });
                        console.log(result2)
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

                        
                        amount_change = result2.map(function(amount){
                            return amount.amount_change;
                        });
                        
                        

                        amount_change = amount_change.filter(function(t, i){
                          return !!time_index[i] 
                        })

                        console.log(amount_change);
                   
                        var color = random_rgba();
                        var ctx = document.getElementById('myChart'+0).getContext('2d');
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
                                            document.getElementById('myChart0').style.cursor = 'pointer';
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
                                        text: b[index]
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

     //effort
     $.ajax({
      type: "GET",
      url: "http://127.0.0.1:8000/api/change_effort_record/?username="+chk_user,
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
                  
                  board.push(relation[index]);
                    
                    // for(let i=0; i<data.length; i++){
                    //     if(board.indexOf(data[i].board) == -1){
                    //         board.push(data[i].board);
                    //     }
                    // }
                  
                    for(let i=0; i<board.length; i++){
                        
                        console.log(board[i])
                        result2 = result.filter(function(b){
                            if(board[i].indexOf(b.board) != -1){
                                return b;
                            }
                        });
                        console.log(result2)
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

                    
                    amount_change = result2.map(function(amount){
                        return amount.amount_change;
                    });
                    
                    

                    amount_change = amount_change.filter(function(t, i){
                      return !!time_index[i] 
                    })

                    console.log(amount_change);
                      
                      var color = random_rgba();
                      var ctx = document.getElementById('myChart'+1).getContext('2d');
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
                                    document.getElementById('myChart1').style.cursor = 'pointer';
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
                                  text: b[index]
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
                      });
                  }

              }
          }); 
       }
   });


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
                  
                  board.push(relation[index]);
                    
                    // for(let i=0; i<data.length; i++){
                    //     if(board.indexOf(data[i].board) == -1){
                    //         board.push(data[i].board);
                    //     }
                    // }
                  
                    for(let i=0; i<board.length; i++){
                        
                        console.log(board[i])
                        result2 = result.filter(function(b){
                            if(board[i].indexOf(b.board) != -1){
                                return b;
                            }
                        });
                        console.log(result2)
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



                      
                      var color = random_rgba();
                      var ctx = document.getElementById('myChart'+2).getContext('2d');
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
                                        document.getElementById('myChart'+2).style.cursor = 'pointer';
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
                                  text: b[index]
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
    $(".week").css("background-color","#4E78B9");
    $(".week").css("color","#ffffff");
    $(".month").css("background-color","#ffffff");
    $(".month").css("color","#333333");
    week_or_month = "week";
    $(".txt-btn").text(formatted_date);
    if(is_in_board){
       all_board(this_board);
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
    if(is_in_board){
        all_board(this_board);
    }

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