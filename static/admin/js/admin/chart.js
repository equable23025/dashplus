$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/timeStamp/",
        success: function (data) {
            console.log(data);
            var timestamp = []; 
            var amount_change = []; 
            for(let i=0; i<data.length; i++){
                timestamp.push(data[i].timestamp);
                amount_change.push(data[i].amountChange);
            }
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