(function(){
	var app = angular.module('sports-feeds', []);

	var boxReq = {		
		method: 'GET',
		url: '/data/WI-DUKE-BOXSCORE.json'
	}
	
	var pbpReq = {		
		method: 'GET',
		url: '/data/WI-DUKE-PBP.json'
	}
	
	app.controller('WIDukeBoxController', ['$http', function($http) {
		var wiDukeBox = this;
		wiDukeBox.stats = [];
			
		$http(boxReq)
			.success(function(data){
				wiDukeBox.stats = data;
// 				homePoints = wiDukeBox.stats.home.leaders.points[0];
// 				console.log(homePoints);
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
	app.controller('WIDukePbpController', ['$http', function($http) {
		var wiDukePbp = this;
		wiDukePbp.stats = [];
			
		$http(pbpReq)
			.success(function(data){
				wiDukePbp.stats = data;
				console.log(data);
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
	app.controller('TabController', function() {
		this.tab = 1;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		this.isSelected = function(checkTab) {
			return this.tab === checkTab;
		};
	});
	
})();
