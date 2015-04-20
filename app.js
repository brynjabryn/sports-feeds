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
	
	var wiKentuckyboxReq = {		
		method: 'GET',
		url: '/data/WI-KENTUCKY-BOXSCORE.json'
	}
	
	var wiKentuckypbpReq = {		
		method: 'GET',
		url: '/data/WI-KENTUCKY-PBP.json'
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
			wiDukePbp.stats.secondHalfArray = [];
			
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
			
			for (i = 0; i < secondEventsLength; i++) {
				var description = "(" + (i+1) + ") " + secondHalf.events[i].description;
					
				if (secondHalf.events[i].possession != undefined) {
					var possession = secondHalf.events[i].possession.market;	
				}
				
				if (possession == "Wisconsin") {
					var event = {
						wiDescription: description,
						clock: secondHalf.events[i].clock,
						dukeDescription: "(" + (i+1) + ")" 	
					};
					wiDukePbp.stats.secondHalfArray.push(event);									
				} else if (possession == "Duke") {
					var event = {
						wiDescription: "(" + (i+1) + ")",
						clock: secondHalf.events[i].clock,
						dukeDescription: description 	
					};
					wiDukePbp.stats.secondHalfArray.push(event);

				} else {
					console.log("Unable to find possession for " + secondHalf.events[i]);
				}	
				
			}
						
		}
	} ]);
	
	app.controller('wiKentuckyBoxController', ['$http', function($http) {
		var wiKentuckyBox = this;
		wiKentuckyBox.stats = [];
			
		$http(wiKentuckyboxReq)
			.success(function(data){
				wiKentuckyBox.stats = data;
			})
			.error(function(response, status) {
				console.log("The SportsData request failed with response " + response + " and status code " + status);
			});
	} ]);
	
	app.controller('wiKentuckyPbpController', ['$http', function($http) {
		var wiKentuckyPbp = this;
		wiKentuckyPbp.stats = [];
			
		$http(wiKentuckypbpReq)
			.success(function(data){
				wiKentuckyPbp.stats = data;
				pbpStatsEvents(wiKentuckyPbp.stats);
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
			
			wiKentuckyPbp.stats.firstHalfArray = [];
			wiKentuckyPbp.stats.secondHalfArray = [];
			
			for (i = 0; i < firstEventsLength; i++) {
				var description = "(" + (i+1) + ") " + firstHalf.events[i].description;
					
				if (firstHalf.events[i].possession != undefined) {
					var possession = firstHalf.events[i].possession.market;	
				}
				
				if (possession == "Wisconsin") {
					var event = {
						wiDescription: description,
						clock: firstHalf.events[i].clock,
						kentuckyDescription: "(" + (i+1) + ")" 	
					};
					wiKentuckyPbp.stats.firstHalfArray.push(event);									
				} else if (possession == "Kentucky") {
					var event = {
						wiDescription: "(" + (i+1) + ")",
						clock: firstHalf.events[i].clock,
						kentuckyDescription: description 	
					};
					wiKentuckyPbp.stats.firstHalfArray.push(event);

				} else {
					console.log("Unable to find possession for " + firstHalf.events[i]);
				}	
				
			}
			
			for (i = 0; i < secondEventsLength; i++) {
				var description = "(" + (i+1) + ") " + secondHalf.events[i].description;
					
				if (secondHalf.events[i].possession != undefined) {
					var possession = secondHalf.events[i].possession.market;	
				}
				
				if (possession == "Wisconsin") {
					var event = {
						wiDescription: description,
						clock: secondHalf.events[i].clock,
						kentuckyDescription: "(" + (i+1) + ")" 	
					};
					wiKentuckyPbp.stats.secondHalfArray.push(event);									
				} else if (possession == "Kentucky") {
					var event = {
						wiDescription: "(" + (i+1) + ")",
						clock: secondHalf.events[i].clock,
						kentuckyDescription: description 	
					};
					wiKentuckyPbp.stats.secondHalfArray.push(event);

				} else {
					console.log("Unable to find possession for " + secondHalf.events[i]);
				}	
				
			}
						
		}
	} ]);
	
	app.controller('NavController', function() {
		this.nav = 1;
		
		this.selectNav = function(setNav) {
			this.nav = setNav;
		};
		
		this.isSelected = function(checkNav) {
			return this.nav === checkNav;
		};
	});
	
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
