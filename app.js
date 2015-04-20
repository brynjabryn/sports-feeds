(function(){
	var app = angular.module('sports-feeds', []);

	var wiDukeboxReq = {		
		method: 'GET',
		url: '/data/WI-DUKE-BOXSCORE.json'
	}
	
	var wiDukepbpReq = {		
		method: 'GET',
		url: '/data/WI-DUKE-PBP.json'
	}
	
	app.controller('WIDukeBoxController', ['$http', function($http) {
		var wiDukeBox = this;
		wiDukeBox.stats = [];
			
		$http(wiDukeboxReq)
			.success(function(data){
				wiDukeBox.stats = data;
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
	app.controller('WIDukePbpController', ['$http', function($http) {
		var wiDukePbp = this;
		wiDukePbp.stats = [];
			
		$http(wiDukepbpReq)
			.success(function(data){
				wiDukePbp.stats = data;
				pbpStatsEvents(wiDukePbp.stats);
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
		
		function pbpStatsEvents(stats) {
			var firstHalf = stats.periods[0],
				secondHalf = stats.periods[1],
				firstEventsLength = firstHalf.events.length,
				secondEventsLength = secondHalf.events.length,
				i;
			
			wiDukePbp.stats.firstHalfArray = [];
			wiDukePbp.stats.secondHalfWiArray = [];
			
			for (i = 0; i < firstEventsLength; i++) {
				var description = "(" + (i+1) + ") " + firstHalf.events[i].description;
					
				if (firstHalf.events[i].possession != undefined) {
					var possession = firstHalf.events[i].possession.market;	
				}
				
				if (possession == "Wisconsin") {
					var event = {
						wiDescription: description,
						clock: firstHalf.events[i].clock,
						dukeDescription: "(" + (i+1) + ")" 	
					};
					wiDukePbp.stats.firstHalfArray.push(event);									
				} else if (possession == "Duke") {
					var event = {
						wiDescription: "(" + (i+1) + ")",
						clock: firstHalf.events[i].clock,
						dukeDescription: description 	
					};
					wiDukePbp.stats.firstHalfArray.push(event);

				} else {
					console.log("Unable to find possession for " + firstHalf.events[i]);
				}	
				
			}
						
		}
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
