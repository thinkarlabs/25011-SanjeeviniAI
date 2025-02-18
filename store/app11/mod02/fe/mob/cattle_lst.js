

_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './app11/fe/mod02/mob/cattle_lst.htm';
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
			_cp.render_view(_cp.views.tableView,data, 'x-cattles');
			_cp.table = _cp.display_table('#tbl_cattles');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('mob.cattle_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('mob.cattle_dtl')
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
  <table class="table table-sm table-striped" id="tbl_cattles">
    <thead>
      <tr>
        <th scope="col">Farmer Name</th>
        <th scope="col">Cattle Title</th> <!-- Added Cattle Title -->
        <th scope="col">Cattle Tag Number</th>
        <th scope="col">Cattle Type</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ajay Kumar</td>
        <td>Jolly Cow</td> <!-- Cattle Title -->
        <td>CT12345</td>
        <td>Cow</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm mx-2" onclick='_cp.on.Edit("1");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm mx-2" onclick='_cp.on.Delete("1");'>
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
      <tr>
        <td>Sunil Patel</td>
        <td>Milk King</td> <!-- Cattle Title -->
        <td>CT67890</td>
        <td>Buffalo</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm mx-2" onclick='_cp.on.Edit("2");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm mx-2" onclick='_cp.on.Delete("2");'>
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
      <tr>
        <td>Meera Singh</td>
        <td>Green Horn</td> <!-- Cattle Title -->
        <td>CT78901</td>
        <td>Cow</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm mx-2" onclick='_cp.on.Edit("3");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm mx-2" onclick='_cp.on.Delete("3");'>
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
      <tr>
        <td>Rajesh Sharma</td>
        <td>Buffalo King</td> <!-- Cattle Title -->
        <td>CT44556</td>
        <td>Buffalo</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm mx-2" onclick='_cp.on.Edit("4");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm mx-2" onclick='_cp.on.Delete("4");'>
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
      <tr>
        <td>Lalita Devi</td>
        <td>Pasture Queen</td> <!-- Cattle Title -->
        <td>CT55667</td>
        <td>Goat</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm mx-2" onclick='_cp.on.Edit("5");'>
            <i class="bi bi-pencil-square"></i> Edit
          </button>
          <button type="button" class="btn btn-danger btn-sm mx-2" onclick='_cp.on.Delete("5");'>
            <i class="bi bi-trash"></i> Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
