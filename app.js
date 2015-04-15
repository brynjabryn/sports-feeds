(function(){
	var app = angular.module('sports-feeds', []);

	var req = {		
		method: 'GET',
		url: '/data/WI-DUKE-BOXSCORE.json'
	}
	
	app.controller('WIDukeController', ['$http', function($http) {
		var wiDuke = this;
		wiDuke.game = [];
			
		$http(req)
			.success(function(data){
				wiDuke.game = data;
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
})();
