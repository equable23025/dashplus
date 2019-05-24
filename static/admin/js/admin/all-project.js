$(document).ready(function(){
        $(".movement").css("color","#ffffff");
        $(".movement").css("background-color","#4E78B9");
        $(".focus").css("color","#333333");
        $(".focus").css("background-color","#ffffff");
        $(".planning").css("color","#333333");
        $(".planning").css("background-color","#ffffff");
        movement_graph();
  

});
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
function movement_graph(){
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
                        
                        timestamp_real = result.map(function(time){
                            return time.timestamp;
                        });
        
                        var timestamp = [];
                        for(let i=1 ;i<=timestamp_real.length;i++){
                            timestamp.push(i);
                        }
                        console.log(timestamp);
                        amount_change = result.map(function(amount){
                            return amount.amount_change;
                        });
                        var time_date = [];
                        for(let i = 0;i<result3.length;i++){
                            if(timestamp[i] == result3[i].id){
                                var date = result3[i].datetime.substr(0, 10);
                                time_date.push(date);
                            }
                        }
                        console.log(time_date);

                        planning_doing = result.map(function(amount){
                            return amount.planning_doing;
                        });
                        planning_testing = result.map(function(amount){
                            return amount.planning_testing;
                        });
                        planning_done = result.map(function(amount){
                            return amount.planning_done;
                        });
                        doing_planning = result.map(function(amount){
                            return amount.doing_planning;
                        });
                        doing_testing = result.map(function(amount){
                            return amount.doing_testing;
                        });
                        doing_done = result.map(function(amount){
                            return amount.doing_done;
                        });
                        testing_planning = result.map(function(amount){
                            return amount.testing_planning;
                        });
                        testing_doing = result.map(function(amount){
                            return amount.testing_doing;
                        });
                        testing_done = result.map(function(amount){
                            return amount.testing_done;
                        });
                        done_planning = result.map(function(amount){
                            return amount.done_planning;
                        });
                        done_doing = result.map(function(amount){
                            return amount.done_doing;
                        });
                        done_testing = result.map(function(amount){
                            return amount.done_testing;
                        });
                        var max_axes = 5;
                        $(".percent_chart").append(`<section class="box-graph move-graph">
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
                                borderDash: [2, 2],
                                datasets: [{
                                    label: 'Planning-doing',
                                    borderColor: [
                                        "rgba(133, 191, 191)",
                                        
                                    ],
                                    borderWidth: 1,
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
                                        borderWidth: 1,
                                        data: planning_testing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Planning-done',
                                        backgroundColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: planning_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing_planning',
                                        backgroundColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: doing_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing_testing',
                                        backgroundColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(63, 127, 191, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: doing_testing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Doing-done',
                                        backgroundColor: [
                                            "rgba(187, 187, 62, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(187, 187, 62, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: doing_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-planning',
                                        backgroundColor: [
                                            "rgba(183, 119, 10, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(183, 119, 10, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: testing_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-doing',
                                        backgroundColor: [
                                            "rgba(187, 62, 187, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(187, 62, 187, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: testing_doing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Testing-done',
                                        backgroundColor: [
                                            "rgba(63, 191, 191, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(63, 191, 191, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: testing_done,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Done-planning',
                                        backgroundColor: [
                                            "rgba(191, 63, 63, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(191, 63, 63, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: done_planning,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        label: 'Done-doing',
                                        backgroundColor: [
                                            "rgba(63, 63, 191, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(63, 63, 191, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
                                        data: done_doing,
                                        legend : {
                                            display : false
                                        }
                                    },{
                                        
                                        label: 'Done-testing',
                                        backgroundColor: [
                                            "rgba(127, 191, 63, 0.3)",
                                            
                                        ],
                                        borderColor: [
                                            "rgba(127, 191, 63, 0.3)",
                                            
                                        ],
                                        borderWidth: 1,
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
                                        }
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
                                            max: max_axes,
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
