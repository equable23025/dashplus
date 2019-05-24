$(document).ready(function(){
    $(".movement").css("color","#333333");
    $(".movement").css("background-color","#ffffff");
    $(".focus").css("color","#ffffff");
    $(".focus").css("background-color","#4E78B9");
    $(".planning").css("color","#333333");
    $(".planning").css("background-color","#ffffff");
    
    scope_change();
  
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