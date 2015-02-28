/**
 * Created by C-Styles on 2/25/15.
 */


function featured_ctrl_featured_index () {
		
		this.addItem = function () {
				var newItemNo = this.items.length + 1;
				this.items.push ('Item ' + newItemNo);
		};

		this.status = {
				isFirstOpen: true,
				isFirstDisabled: false
		};


}

