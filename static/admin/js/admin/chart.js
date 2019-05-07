$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/card_record/",
        success: function(data){
            var result = JSON.parse(data);
            var result2 ;
            var timestamp = []; 
            var amount_change = [];
            var board = [];  
            //key user,value board ถ้ามีทั้งสองอย่าง ก็ให้ใส่ลงไปในอาเรย์
            for(let i=0; i<data.length; i++){
                board.push(data[i].board);
            }
            for(let i=0; i<board.length; i++){
                result2 = result.filter(function(b){
                    if(board[i].indexOf(a.board) != -1){
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
                    <div class="name_graph">`+board[i].board+`</div>
                </div>
                </section>`);

                var ctx = document.getElementById('myChart'+i).getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timestamp,
                        datasets: [{
                            label: 'Requriment change',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                
                            ],
                            borderWidth: 1,
                            data: amount_change
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    // suggestedMin: 50,
                                    // suggestedMax: 100
                                }
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