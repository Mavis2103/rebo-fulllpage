// var time_spending = document.getElementById('chart-time_spending').getContext('2d');
// var chart = new Chart(time_spending, {
// 	// The type of chart we want to create
// 	type: 'bar',

// 	// The data for our dataset
// 	data: {
// 		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// 		datasets: [
// 			{
// 				label: 'My First dataset',
// 				backgroundColor: '#74b9ff',
// 				borderColor: 'rgba(0, 0, 0, 0.1)',
// 				data: [0, 10, 5, 2, 20, 30, 45],
// 			},
// 		],
// 	},

// 	// Configuration options go here
// 	options: {
// 		scales: {
// 			xAxes: [
// 				{
// 					gridLines: {
// 						display: false,
// 					},
// 				},
// 			],
// 			yAxes: [
// 				{
// 					gridLines: {
// 						display: false,
// 					},
// 					ticks: {
// 						display: false,
// 					},
// 				},
// 			],
// 		},
// 	},
// });

// var growth = document.getElementById('chart-growth').getContext('2d');
// var chart = new Chart(growth, {
// 	// The type of chart we want to create
// 	type: 'line',

// 	// The data for our dataset
// 	data: {
// 		labels: ['', '', '', '', '', '', ''],
// 		datasets: [
// 			{
// 				label: 'My First dataset',
// 				backgroundColor: 'rgba(0,0,0,0)',
// 				borderColor: '#e67e22',
// 				data: [0, 10, 5, 2, 20, 30, 45],
// 			},
// 		],
// 	},

// 	// Configuration options go here
// 	options: {
// 		scales: {
// 			xAxes: [
// 				{
// 					gridLines: {
// 						display: false,
// 					},
// 				},
// 			],
// 			yAxes: [
// 				{
// 					gridLines: {
// 						display: false,
// 					},
// 					ticks: {
// 						display: false,
// 					},
// 				},
// 			],
// 		},
// 		legend: {
// 			display: false,
// 		},
// 		tooltips: {
// 			callbacks: {
// 				label: function (tooltipItem) {
// 					return tooltipItem.yLabel;
// 				},
// 			},
// 		},
// 	},
// });