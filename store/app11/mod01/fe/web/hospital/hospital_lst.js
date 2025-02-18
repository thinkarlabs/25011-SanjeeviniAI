_cp = _app.curr_page

_cp.init = function(){
	//Define the page URL and the base API
	_cp.views.page = './app11/fe/mod01/web/hospital/hospital_lst.htm';	
	_cp.api.list = '/app03/api/mod01/anganwadi/';

	//Render the page.
	_cp.render_page(_cp.views.page,'');	
	
	//Call the filter to get the data.
	 _cp.on.filter_list();	

	//Bind events for add and search. 
	//NOTE : Events for edit and delete are defined in their respective onclick events in the view.
	_app.bind_event('#btnAdd','click',_cp.on.Add);
	_app.bind_event('#searchhospitals','keyup',_cp.on.Search);
}

_cp.on.filter_list = function(){
	// _filter = ''
	_filter = '?hub=' + _app.curr_ses.user.hub_id
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
			_cp.render_view(_cp.views.tableView,data, 'x-hospitals');
			_cp.table = _cp.display_table('#tbl_hospitals');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('store.hospital_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('store.hospital_dtl')
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
  <table class="table table-sm table-striped" id="tbl_hospitals">
    <thead>
      <tr>
        <th scope="col">Hospital Name</th>
        <th scope="col">Hospital Phone Number</th>
        <th scope="col">Pin Code</th>
        <th scope="col">Village</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Bombay Veterinary College Hospital</td>
        <td>022-24137589</td>
        <td>400012</td>
        <td>Parel, Mumbai</td>
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
        <td>Madras Veterinary College Hospital</td>
        <td>044-25381506</td>
        <td>600007</td>
        <td>Vepery, Chennai</td>
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
        <td>Bengaluru Veterinary Hospital</td>
        <td>080-23411503</td>
        <td>560024</td>
        <td>Hebbal, Bengaluru</td>
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
        <td>Indian Veterinary Research Institute</td>
        <td>0581-2300096</td>
        <td>243122</td>
        <td>Izzatnagar, Bareilly</td>
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
        <td>Govt Veterinary Polyclinic</td>
        <td>011-23392321</td>
        <td>110001</td>
        <td>Connaught Place, Delhi</td>
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



