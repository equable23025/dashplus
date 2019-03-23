$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "",
        success: function (data) {
            var result = JSON.parse(data);
            for(var i = 0;i<result.length;i++){
                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ["1", "2", "3", "4", "5", "6"],
                        datasets: [{
                            label: 'Requriment change',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                
                            ],
                            borderWidth: 1,
                            data: [1,2,3,4,5]
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