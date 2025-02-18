_cp = _app.curr_page

_cp.init = function(){
	//Define the page URL and the base API
	_cp.views.page = './app11/fe/mod01/web/staff/staff_lst.htm';
	_cp.api.list = '/app03/api/mod01/donor/';

	//Render the page.
	_cp.render_page(_cp.views.page,'');	
	
	//Call the filter to get the data.
	_cp.on.filter_list();	

	//Bind events for add and search. 
	//NOTE : Events for edit and delete are defined in their respective onclick events in the view.
	_app.bind_event('#btnAdd','click',_cp.on.Add);
	_app.bind_event('#txtSearch','keyup',_cp.on.Search);
}

_cp.on.filter_list = function(){
	_filter = '?hub=' + _app.curr_ses.user.hub_id
    _app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);
		_cp.render_view(_cp.views.tableView,data, 'x-staffs');
		_cp.table = _cp.display_table('#tbl_staffs');
	});	
};

//ADD 
_cp.on.Add = function(){
	_app.nav_page('store.staff_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('store.staff_dtl')
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
  <table class="table table-sm table-striped" id="tbl_staffs">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Staff</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Email</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alice Brown</td>
        <td>Myrada Team</td>
        <td>1122334455</td>
        <td>alice.brown@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("1");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("1");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Bob Carter</td>
        <td>Maitri Worker</td>
        <td>2233445566</td>
        <td>bob.carter@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("2");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("2");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Clara Evans</td>
        <td>Myrada Team</td>
        <td>3344556677</td>
        <td>clara.evans@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("3");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("3");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Daniel Foster</td>
        <td>Myrada Team</td>
        <td>4455667788</td>
        <td>daniel.foster@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("4");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("4");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Ella Green</td>
        <td>Maitri Worker</td>
        <td>5566778899</td>
        <td>ella.green@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("5");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("5");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Felix Harrison</td>
        <td>Paravet</td>
        <td>6677889900</td>
        <td>felix.harrison@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("6");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("6");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
      <tr>
        <td>Grace Ivan</td>
        <td>Farmer</td>
        <td>7788990011</td>
        <td>grace.ivan@example.com</td>
        <td class="text-center">
          <button type="button" class="btn btn-danger btn-sm float-end mx-2" 
            onclick='_cp.on.Delete("7");'><i class="bi bi-trash"></i> Delete</button>
          <button type="button" class="btn btn-primary btn-sm float-end mx-2" 
            onclick='_cp.on.Edit("7");'><i class="bi bi-pencil-square"></i> Edit</button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
