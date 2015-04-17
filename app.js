(function(){
	var app = angular.module('sports-feeds', []);

	var req = {		
		method: 'GET',
		url: '/data/WI-DUKE-BOXSCORE.json'
	}
	
	app.controller('WIDukeBoxController', ['$http', function($http) {
		var wiDukeBox = this;
		wiDukeBox.stats = [];
			
		$http(req)
			.success(function(data){
				wiDukeBox.stats = data;
				homePoints = wiDukeBox.stats.home.leaders.points[0];
				console.log(homePoints);
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
})();
