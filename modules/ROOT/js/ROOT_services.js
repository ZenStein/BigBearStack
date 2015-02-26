/**
 * Created by C-Styles on 2/25/15.
 */
function ROOTService ($http, ROOT_HOST, ROOT_PHP) {
		this.tagFilters = {filterNames: []};
		this.grabAllTags = function () {
				var allTags = this;
				var req = {
						method: 'POST',
						url: ROOT_HOST + ROOT_PHP + 'grabtags.php',
						headers: {'Content-Type': 'application/json'}
				};
				$http (req)
								.success (function (jsondata) {
						allTags.tagdata = jsondata;
				});
				return allTags;

		};
		this.setUnsetTagFilt = function (obj) { //alert(typeof obj)
				var tagNum = this.tagFilters.filterNames.length;
				var handl = this.tagFilters.filterNames;
				console.log ("handl= " + handl);
				console.log ("obj= " + obj);
				if ( tagNum === 0 ) {
						handl.push (obj);
						return 200;
				}
				for (var x = 0; x < tagNum; x++) {
						if ( handl[x] == obj ) {
								handl.splice (x, 1);
								console.log (handl);
								return 200;
						}
						if ( x == tagNum - 1 ) {
								handl.push (obj);
								console.log (handl);
								return 200;
						}
				}
				console.log ("Error: handl= " + handl);
				console.log ("Error: obj= " + obj);
				return "Error: Conditions were supposed to have been met";
		};
}