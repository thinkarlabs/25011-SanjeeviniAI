
_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './app11/fe/mod01/web/view/farmer_lst.htm';	
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


//EDIT
_cp.on.View = function(){
	_app.nav_page('store.farmer_dtl')
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
  <table class="table table-sm table-striped" id="tbl_farmers">
    <thead>
      <tr>
        <th>Farmer Name</th>
        <th scope="col">Aadhaar Number</th>
        <th scope="col">Pin Code</th>
        <th scope="col">Village (Address)</th>
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
        <td>Ramesh Yadav</td>
        <td>***-****-9012</td>
        <td>244901</td>
        <td>Rampur, Uttar Pradesh</td>
        <td>9876543210</td>
        <td>25</td>
        <td>Green Fodder</td>
        <td>Open Shed</td>
        <td>120</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("1");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>Seema Patel</td>
        <td>***-****-0123</td>
        <td>495001</td>
        <td>Bilaspur, Madhya Pradesh</td>
        <td>9876543221</td>
        <td>20</td>
        <td>Dry Fodder</td>
        <td>Closed Shed</td>
        <td>80</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("2");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>Anil Sharma</td>
        <td>***-****-1234</td>
        <td>131001</td>
        <td>Sonepat, Haryana</td>
        <td>9876543232</td>
        <td>30</td>
        <td>Mixed Fodder</td>
        <td>Open Shed</td>
        <td>150</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("3");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>Meera Singh</td>
        <td>***-****-2345</td>
        <td>422001</td>
        <td>Nashik, Maharashtra</td>
        <td>9876543243</td>
        <td>18</td>
        <td>Green Fodder</td>
        <td>Closed Shed</td>
        <td>70</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("4");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
      <tr>
        <td>Suresh Patil</td>
        <td>***-****-3456</td>
        <td>416003</td>
        <td>Kolhapur, Maharashtra</td>
        <td>9876543254</td>
        <td>35</td>
        <td>Dry Fodder</td>
        <td>Open Shed</td>
        <td>140</td>
        <td class="text-center">
          <button type="button" class="btn btn-primary btn-sm" onclick='_cp.on.View("5");'>
            <i class="bi bi-eye"></i> View
          </button>
        </td>
      </tr>
    </tbody>
  </table>`;

_cp.init();
