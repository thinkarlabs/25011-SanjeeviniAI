_cp = _app.curr_page

_cp.init = function(){
	//Define the page URL and the base API
	_cp.views.page = './fe/app11/mod01/web/location/location_lst.htm';	
	// _cp.api.list = '/app03/api/mod01/program/';

	//Render the page.
	_cp.render_page(_cp.views.page,'');	
	
	//Call the filter to get the data.
	 // _cp.on.filter_list();	

	//Bind events for add and search. 
	//NOTE : Events for edit and delete are defined in their respective onclick events in the view.
	_app.bind_event('#btnAdd','click',_cp.on.Add);
	_app.bind_event('#searchlocations','keyup',_cp.on.Search);
}

_cp.on.filter_list = function(){
	_filter = '?hub=' + _app.curr_ses.user.hub_id
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
			_cp.render_view(_cp.views.tableView,data, 'x-locations');
			_cp.table = _cp.display_table('#tbl_locations');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('store.location_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('store.location_dtl')
	return false;
}

//DELETE
_cp.on.Delete = function(id){
	_app.del(_cp.api.list + id, function(data){
		_cp.init();
	});
	return false;
}

//SEARCH
_cp.on.Search = function(){
	_cp.table.search(this.value).draw();
	return false;
}

_cp.views.tableView = `
		<table class="table table-sm table-striped" id="tbl_locations">
		  <thead>
			<tr>
			  <th>Country</th>
			  <th>State</th>
			  <th>District</th>
			  <th>Taluk</th>
			  <th>Village</th>
			  <th>Pin Code</th>
			  <th class="text-center">Actions</th>
			</tr>
		  </thead>
		  <tbody>
			<tr>
			  <td>India</td>
			  <td>Karnataka</td>
			  <td>Bangalore</td>
			  <td>Yelahanka</td>
			  <td>Jakkur</td>
			  <td>560064</td>
			  <td class="text-center">
				<button type="button" class="btn btn-danger btn-sm float-end mx-2" 
					onclick='_cp.on.Delete("1");'><i class="bi bi-trash"></i> Delete</button>
				<button type="button" class="btn btn-primary btn-sm float-end mx-2" 
					onclick='_cp.on.Edit("1");'><i class="bi bi-pencil-square"></i> Edit</button>
			  </td>
			</tr>
			<tr>
			  <td>India</td>
			  <td>Maharashtra</td>
			  <td>Pune</td>
			  <td>Mulshi</td>
			  <td>Lavale</td>
			  <td>411042</td>
			  <td class="text-center">
				<button type="button" class="btn btn-danger btn-sm float-end mx-2" 
					onclick='_cp.on.Delete("2");'><i class="bi bi-trash"></i> Delete</button>
				<button type="button" class="btn btn-primary btn-sm float-end mx-2" 
					onclick='_cp.on.Edit("2");'><i class="bi bi-pencil-square"></i> Edit</button>
			  </td>
			</tr>
			<tr>
			  <td>India</td>
			  <td>Tamil Nadu</td>
			  <td>Coimbatore</td>
			  <td>Mettupalayam</td>
			  <td>Kallar</td>
			  <td>641305</td>
			  <td class="text-center">
				<button type="button" class="btn btn-danger btn-sm float-end mx-2" 
					onclick='_cp.on.Delete("3");'><i class="bi bi-trash"></i> Delete</button>
				<button type="button" class="btn btn-primary btn-sm float-end mx-2" 
					onclick='_cp.on.Edit("3");'><i class="bi bi-pencil-square"></i> Edit</button>
			  </td>
			</tr>
			<tr>
			  <td>India</td>
			  <td>Kerala</td>
			  <td>Ernakulam</td>
			  <td>Aluva</td>
			  <td>Keezhmad</td>
			  <td>683112</td>
			  <td class="text-center">
				<button type="button" class="btn btn-danger btn-sm float-end mx-2" 
					onclick='_cp.on.Delete("4");'><i class="bi bi-trash"></i> Delete</button>
				<button type="button" class="btn btn-primary btn-sm float-end mx-2" 
					onclick='_cp.on.Edit("4");'><i class="bi bi-pencil-square"></i> Edit</button>
			  </td>
			</tr>
			<tr>
			  <td>India</td>
			  <td>Rajasthan</td>
			  <td>Jaipur</td>
			  <td>Sanganer</td>
			  <td>Pratap Nagar</td>
			  <td>302033</td>
			  <td class="text-center">
				<button type="button" class="btn btn-danger btn-sm float-end mx-2" 
					onclick='_cp.on.Delete("5");'><i class="bi bi-trash"></i> Delete</button>
				<button type="button" class="btn btn-primary btn-sm float-end mx-2" 
					onclick='_cp.on.Edit("5");'><i class="bi bi-pencil-square"></i> Edit</button>
			  </td>
			</tr>
		  </tbody>
		</table>`;


_cp.init();
