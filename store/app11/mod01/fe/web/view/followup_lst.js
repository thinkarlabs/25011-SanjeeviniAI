
_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './app11/fe/mod01/web/view/followup_lst.htm';	
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
	_filter = ''
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
			_cp.render_view(_cp.views.tableView,data, 'x-followups');
			_cp.table = _cp.display_table('#tbl_followups');							
	});	
}


//EDIT
_cp.on.View = function(){
	_app.nav_page('store.followup_dtl')
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
  <table class="table table-sm table-striped" id="tbl_followups">
    <thead>
      <tr>
        <th scope="col">Farmer Phone Number</th>
        <th scope="col">Visit Date</th>
        <th scope="col">Cattle Tag Number</th>
        <th scope="col">Cattle Title</th>
        <th scope="col">Village</th>
        <th scope="col">AI Status</th>
        <th scope="col">Pregnancy Status</th>
        <th scope="col">Pregnancy Date</th>
        <th scope="col">Birth Status</th>
        <th scope="col">Birth Date</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>9876543210</td>
        <td>2025-01-10</td>
        <td>CT00123</td>
        <td>Pregnant Cow</td>
        <td>Gujarat</td>
        <td>Completed</td>
        <td>Pregnant</td>
        <td>2025-01-12</td>
        <td>Scheduled</td>
        <td>2025-02-01</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("CT00123");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>8765432109</td>
        <td>2025-01-18</td>
        <td>CT00456</td>
        <td>Milk Queen</td>
        <td>Uttar Pradesh</td>
        <td>Completed</td>
        <td>Not Pregnant</td>
        <td>2025-01-20</td>
        <td>Scheduled</td>
        <td>2025-02-10</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("CT00456");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>7654321098</td>
        <td>2025-02-05</td>
        <td>CT00789</td>
        <td>Golden Horn</td>
        <td>Chhattisgarh</td>
        <td>Scheduled</td>
        <td>Pregnant</td>
        <td>2025-02-05</td>
        <td>Completed</td>
        <td>2025-03-15</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("CT00789");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>9123456789</td>
        <td>2025-01-25</td>
        <td>CT01234</td>
        <td>Black Beauty</td>
        <td>Gujarat</td>
        <td>Completed</td>
        <td>Not Pregnant</td>
        <td>2025-01-27</td>
        <td>Scheduled</td>
        <td>2025-02-05</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("CT01234");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>9345678901</td>
        <td>2025-03-15</td>
        <td>CT05678</td>
        <td>Pasture Queen</td>
        <td>Maharashtra</td>
        <td>Scheduled</td>
        <td>Pregnant</td>
        <td>2025-02-12</td>
        <td>Completed</td>
        <td>2025-04-01</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("CT05678");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
