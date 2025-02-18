_cp = _app.curr_page

_cp.init = function(){
	//Define the page URL and the base API
	_cp.views.page = './app11/fe/mod01/web/activity/activity_lst.htm';	
	_cp.api.list = '/app03/api/mod01/anganwadi/';

	//Render the page.
	_cp.render_page(_cp.views.page,'');	
	
	//Call the filter to get the data.
	 _cp.on.filter_list();	

	//Bind events for add and search. 
	//NOTE : Events for edit and delete are defined in their respective onclick events in the view.
	_app.bind_event('#btnAdd','click',_cp.on.Add);
	_app.bind_event('#searchactivity','keyup',_cp.on.Search);
}

_cp.on.filter_list = function(){
	
	_cp.render_view(_cp.views.tableView, 'x-activity');
	_cp.table = _cp.display_table('#tbl_activity');
	
	// _app.get(_cp.api.list + _filter, function( data ) {	
		// _app.log(data);	 
			// _cp.render_view(_cp.views.tableView, 'x-activity');
			// _cp.table = _cp.display_table('#tbl_activity');							
	// });	
}


//ADD
_cp.on.Add = function(){
	_app.nav_page('store.activity_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('store.activity_dtl')
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

//LIST
_cp.views.tableView = `
  <table class="table table-sm table-striped" id="tbl_activity">
    <thead>
      <tr>
        <th scope="col">Staff</th>
        <th scope="col">Metric Name</th>
        <th scope="col">Village</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
        <th scope="col">Metric Unit</th>
        <th scope="col">Actual Value</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Anna Brown</td>
        <td>Animal Welfare</td>
        <td>Jakkur</td>
        <td>2023-01-15</td>
        <td>2023-02-15</td>
        <td>People</td>
        <td>60</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("1");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("1");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>Tom Green</td>
        <td>Sustainable Practices</td>
        <td>Lavale</td>
        <td>2023-02-01</td>
        <td>2023-03-01</td>
        <td>Hours</td>
        <td>35</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("2");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("2");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>Michael Johnson</td>
        <td>Community Outreach</td>
        <td>Kallar</td>
        <td>2023-03-10</td>
        <td>2023-04-10</td>
        <td>Participants</td>
        <td>80</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("3");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("3");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>Emily Davis</td>
        <td>Veterinary Services</td>
        <td>Keezhmad</td>
        <td>2023-04-01</td>
        <td>2023-05-01</td>
        <td>Visits</td>
        <td>45</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("4");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("4");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>Sarah Johnson</td>
        <td>Farm Development</td>
        <td>Pratap Nagar</td>
        <td>2023-05-05</td>
        <td>2023-06-05</td>
        <td>Acres</td>
        <td>65</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("5");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("5");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
