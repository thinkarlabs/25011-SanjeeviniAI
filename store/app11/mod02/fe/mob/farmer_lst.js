
_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './app11/fe/mod02/mob/farmer_lst.htm';	
	_cp.api.list = '/app03/api/mod02/ang_pg/';
	
	//Render the page.
	_cp.render_page(_cp.views.page,'');

	//Call the filter to get the data.
	_cp.on.filter_list();

	//Bind events for add and search. 
	//NOTE : Events for edit and delete are defined in their respective onclick events in the view.
	_app.bind_event('#btnAdd','click',_cp.on.Add);

}

_cp.on.filter_list = function(){
	// _filter = ''
	_filter = '?hub=' + _app.curr_ses.user.hub_id
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
			_cp.render_view(_cp.views.tableView,data, 'x-farmers');
			_cp.table = _cp.display_table('#tbl_farmers');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('mob.farmer_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('mob.farmer_dtl')
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
  <div class="table-responsive">
    <table class="table table-sm table-striped" id="tbl_requests">
      <thead>
        <tr>
          <th scope="col">Farmer Name</th>
          <th scope="col">Aadhaar Number</th>
          <th scope="col">Village (Address)</th>
          <th scope="col">Pincode</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Count of Cattle</th>
          <th scope="col">Type of Fodder</th>
          <th scope="col">Type of Shed</th>
          <th scope="col">Liters of Milk</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ramesh Kumar</td>
          <td>1234-5678-9012</td>
          <td>Sardar Nagar</td>
          <td>560064</td>
          <td>9876543210</td>
          <td>5</td>
          <td>Green Fodder</td>
          <td>Shed</td>
          <td>12</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.Edit("1");'>
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick='_cp.on.Delete("1");'>
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Sita Devi</td>
          <td>2345-6789-0123</td>
          <td>Rampur</td>
          <td>411042</td>
          <td>8765432109</td>
          <td>8</td>
          <td>Dry Fodder</td>
          <td>Shed</td>
          <td>18</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.Edit("2");'>
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick='_cp.on.Delete("2");'>
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Mohan Singh</td>
          <td>3456-7890-1234</td>
          <td>Bhilai</td>
          <td>641305</td>
          <td>7654321098</td>
          <td>6</td>
          <td>Mixed Fodder</td>
          <td>Shed</td>
          <td>15</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.Edit("3");'>
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick='_cp.on.Delete("3");'>
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Radha Patel</td>
          <td>4567-8901-2345</td>
          <td>Anand</td>
          <td>683112</td>
          <td>9123456789</td>
          <td>7</td>
          <td>Green Fodder</td>
          <td>Shed</td>
          <td>14</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.Edit("4");'>
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick='_cp.on.Delete("4");'>
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td>Suraj Yadav</td>
          <td>5678-9012-3456</td>
          <td>Sangli</td>
          <td>302033</td>
          <td>9345678901</td>
          <td>10</td>
          <td>Concentrate Feed</td>
          <td>Shed</td>
          <td>20</td>
          <td class="text-center">
            <div class="d-flex justify-content-center gap-2">
              <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.Edit("5");'>
                <i class="bi bi-pencil-square"></i> Edit
              </button>
              <button type="button" class="btn btn-danger btn-sm" onclick='_cp.on.Delete("5");'>
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;

_cp.init();

