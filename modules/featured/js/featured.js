/**
 * Created by C-Styles on 2/25/15.
 */
'use strict';

(function () {

		function featured_config($routeProvider) {
				$routeProvider.
								when ('/featured', {
						templateUrl: 'modules/featured/partials/featured_index.html',
						controller: 'featured_ctrl_featured_index as Featured_IndexCTRL'
				});
		}

		angular
						.module ('featured', [])
						.config (featured_config)
						.controller ('featured_ctrl_featured_index', featured_ctrl_featured_index);


})();