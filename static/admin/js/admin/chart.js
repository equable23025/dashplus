$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/change_record/",
        success: function(data){
            var result = data;
            var result2 ;
            var timestamp = []; 
            var amount_change = [];
            var board = [];  
            var user = [];  
            // key user,value board ถ้ามีทั้งสองอย่าง ก็ให้ใส่ลงไปในอาเรย์
            for(let i=0; i<data.length; i++){
                if(board.indexOf(data[i].board) == -1 && user.indexOf(data[i].username) == -1){
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
                timestamp = result2.map(function(time){
                    return time.timestamp;
                });
                amount_change = result2.map(function(amount){
                    return amount.amount_change;
                });

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
                        labels: timestamp,
                        datasets: [{
                            label: 'Requriment change',
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

                    // Configuration options go here
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Chart with Multiline Labels'
                        },
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero:true,
                                    // suggestedMin: 50,
                                    // suggestedMax: 100
                                },
                                scaleLabel: { display: true, labelString: 'Day' },
                                scaleBeginAtZero : true,
                            }],
                            yAxes:[{
                                display: true,
                                ticks: {
                                    beginAtZero:true,
                                    // suggestedMin: 50,
                                    // suggestedMax: 100
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
    

});
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

