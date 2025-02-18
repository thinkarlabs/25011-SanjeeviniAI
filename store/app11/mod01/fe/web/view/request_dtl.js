_cp = _app.curr_page;
console.log('good afternoon');

_cp.init = function () {
  _cp.views.page = './app11/fe/mod01/web/view/request_dtl.htm';
  _cp.api.item = '/app03/api/mod01/anganwadi/';

  // If params exist, it's EDIT mode; otherwise, ADD mode.
  if (_cp.params !== '') {
    _app.get(_cp.api.item + _cp.params, function (item_data) {
      _cp.render_page(_cp.views.page, item_data);
      _cp.load();
    });
  } else {
    _cp.render_page(_cp.views.page, '');
    _cp.load();
  }
};

// FILTER
_cp.load = function () {
  _app.bind_event('#btnCancel', 'click', _cp.on.Cancel);
  _app.bind_event('#btnSave', 'click', _cp.on.Save);

  // Bind phone number input to update farmer name
  _app.bind_event('#phone_number', 'input', function () {
    updateFarmerName(this.value);
  });
};

// CANCEL
_cp.on.Cancel = function () {
  _app.nav_page('store.request_lst');
  return false;
};

// Function to update farmer name based on phone number input
function updateFarmerName(phone) {
  const farmerLabel = document.getElementById("farmer_label");

  // Dummy phone number-to-farmer mapping
  const farmers = {
    "9876543210": "Ajay Kumar",
    "7654321098": "Sunil Patel",
    "9123456789": "Meera Singh",
    "9234567890": "Rajesh Sharma",
    "9345678901": "Lalita Devi"
  };

  // Update label if phone number matches, else show "Unknown Farmer"
  farmerLabel.textContent = farmers[phone] || "Unknown Farmer";
}


//SAVE
_cp.on.Save = function(){
	
	_app.nav_page('store.request_lst');
	return false;
}

_cp.init();
