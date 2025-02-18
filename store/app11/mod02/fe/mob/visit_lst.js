

_cp = _app.curr_page

_cp.init = function(){
	_cp.views.page = './app11/fe/mod02/mob/visit_lst.htm';
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
			_cp.render_view(_cp.views.tableView,data, 'x-visits');
			_cp.table = _cp.display_table('#tbl_visits');							
	});	
}

//ADD
_cp.on.Add = function(){
	_app.nav_page('mob.visit_dtl')
	return false;
}

//EDIT
_cp.on.Edit = function(){
	_app.nav_page('mob.visit_dtl')
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
          <th scope="col">Phone Number</th>
          <th scope="col">Village Name</th>
          <th scope="col">Request Date</th>
          <th scope="col">Visit Date</th> <!-- Visit Date column -->
          <th scope="col">Cattle Title</th>
          <th scope="col">Cattle Tag Number</th>
          <th scope="col">Veterinary Hospital</th>
          <th scope="col">Sperm Type</th>
          <th scope="col">Sperm Tube Id</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sunil Patel</td>
          <td>9876543210</td>
          <td>Jakkur</td>
          <td>14-08-2022</td>
          <td>15-08-2022</td> <!-- Visit Date data -->
          <td>Cattle Title 1</td>
          <td>Cow</td>
          <td>CT00123</td>
          <td>Govt Vet Clinic</td>
          <td>HF</td>
          <td>ST001</td>
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
          <td>Ajay Kumar</td>
          <td>9876543220</td>
          <td>Lavale</td>
          <td>15-08-2022</td>
          <td>16-08-2022</td> <!-- Visit Date data -->
          <td>Cattle Title 2</td>
          <td>Buffalo</td>
          <td>CT00456</td>
          <td>Animal Care Center</td>
          <td>MR</td>
          <td>ST002</td>
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
          <td>Meera Singh</td>
          <td>9876543230</td>
          <td>Pratap Nagar</td>
          <td>16-08-2022</td>
          <td>17-08-2022</td> <!-- Visit Date data -->
          <td>Cattle Title 3</td>
          <td>Cow</td>
          <td>CT00789</td>
          <td>Vet Hospital</td>
          <td>SH</td>
          <td>ST003</td>
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
          <td>Rajesh Sharma</td>
          <td>9876543240</td>
          <td>Lavale</td>
          <td>17-08-2022</td>
          <td>18-08-2022</td> <!-- Visit Date data -->
          <td>Cattle Title 4</td>
          <td>Buffalo</td>
          <td>CT01234</td>
          <td>Govt Vet Clinic</td>
          <td>JR</td>
          <td>ST004</td>
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
          <td>Lalita Devi</td>
          <td>9876543250</td>
          <td>Kallar</td>
          <td>18-08-2022</td>
          <td>19-08-2022</td> <!-- Visit Date data -->
          <td>Cattle Title 5</td>
          <td>Cow</td>
          <td>CT05678</td>
          <td>Animal Care Center</td>
          <td>HF</td>
          <td>ST005</td>
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

_cp.init()