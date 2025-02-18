_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './fe/app11/mod02/mob/request_lst.htm';
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
	let _filter = '?hub=' + _app.curr_ses.user.hub_id;
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
		_cp.render_view(_cp.views.tableView,data, 'x-requests');
		_cp.table = _cp.display_table('#tbl_requests');					
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('mob.request_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('mob.request_dtl')
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
  <table class="table table-sm table-striped" id="tbl_requests">
    <thead>
      <tr>
        <th scope="col">Farmer Name</th>
        <th scope="col">Phone Number</th> <!-- Updated header -->
        <th scope="col">Request Date</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ajay Kumar</td> <!-- Farmer Name -->
        <td>9876543210</td> <!-- Phone Number -->
        <td>2025-01-24</td> <!-- Request Date -->
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
        <td>Sunil Patel</td> <!-- Farmer Name -->
        <td>7654321098</td> <!-- Phone Number -->
        <td>2025-01-22</td> <!-- Request Date -->
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
        <td>Meera Singh</td> <!-- Farmer Name -->
        <td>9123456789</td> <!-- Phone Number -->
        <td>2025-01-21</td> <!-- Request Date -->
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
        <td>Rajesh Sharma</td> <!-- Farmer Name -->
        <td>9234567890</td> <!-- Phone Number -->
        <td>2025-01-20</td> <!-- Request Date -->
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("5");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("5");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
      <tr>
        <td>Lalita Devi</td> <!-- Farmer Name -->
        <td>9345678901</td> <!-- Phone Number -->
        <td>2025-01-19</td> <!-- Request Date -->
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" onclick='_cp.on.Delete("6");'>
            <i class="bi bi-trash"></i> Delete
          </button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" onclick='_cp.on.Edit("6");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
