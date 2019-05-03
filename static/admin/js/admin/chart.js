$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/change_record/",
        success: function (data) {
            // console.log(data);
            var timestamp = []; 
            var amount_change = [];
            var username = []; 
            var board = [];  
            //key user,value board ถ้ามีทั้งสองอย่าง ก็ให้ใส่ลงไปในอาเรย์
            for(let i=0; i<data.length; i++){
                timestamp.push(data[i].timestamp);
                amount_change.push(data[i].amount_change);
                // username.push(data[i].username);
                // board.push(data[i].board);
                // timestamp.push(data[i].timestamp);
                // amount_change.push(data[i].amountChange);
            }
            console.log(timestamp);
            console.log(amount_change);
                var ctx = document.getElementById('myChart').getContext('2d');
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
     });
    

});