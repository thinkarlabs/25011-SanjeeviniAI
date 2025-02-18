_cp = _app.curr_page

_cp.init = function(){
	//Define the page URL and the base API
	_cp.views.page = './app11/fe/mod01/web/metric/metric_lst.htm';	
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
	_filter = ''
	_app.get(_cp.api.list + _filter, function( data ) {	
		_app.log(data);	
			_cp.render_view(_cp.views.tableView,data, 'x-metric');
			_cp.table = _cp.display_table('#tbl_metric');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('store.metric_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('store.metric_dtl')
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
  <table class="table table-sm table-striped" id="tbl_metric">
    <thead>
      <tr>
        <th scope="col">Metric Name</th>
        <th scope="col">Planned Value</th>
        <th scope="col">Metric Unit</th>
        <th scope="col">Actual Value</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Milk Production</td>
        <td>500</td>
        <td>Liters</td>
        <td>450</td>
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
        <td>Calf Birth Rate</td>
        <td>30</td>
        <td>Calves</td>
        <td>25</td>
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
        <td>Farmer Training Sessions</td>
        <td>20</td>
        <td>Sessions</td>
        <td>18</td>
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
        <td>Veterinary Visits</td>
        <td>100</td>
        <td>Visits</td>
        <td>95</td>
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
        <td>Feed Consumption</td>
        <td>2000</td>
        <td>Kg</td>
        <td>1900</td>
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
