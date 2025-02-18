_cp = _app.curr_page;

_cp.init = function () {
    _cp.views.page = './app11/fe/mod01/web/activityreport/activityreport_lst.htm';
    _cp.api.list = '/app03/api/mod01/anganwadi/';

    _cp.render_page(_cp.views.page, '');
    _cp.render_summary();
    _cp.on.filter_list();

    _app.bind_event('#btnAdd', 'click', _cp.on.Add);
    _app.bind_event('#searchactivityreports', 'keyup', _cp.on.Search);
};

_cp.render_summary = function () {
    let summaryHTML = `
        <div class="container mt-4">
            <div class="row g-3">
                ${_cp.create_card("Training Sessions", "bi-bar-chart-fill", "activity-training", "primary")}
                ${_cp.create_card("Seeds Distributed", "bi-tree-fill", "activity-seeds", "success")}
                ${_cp.create_card("Sheds Built", "bi-house-fill", "activity-sheds", "warning")}
                ${_cp.create_card("Fodder Provided", "bi-box-seam", "activity-fodder", "danger")}
            </div>
        </div>
    `;
    document.getElementById('x-activityreports').insertAdjacentHTML('beforebegin', summaryHTML);
};

// Function to Create Uniform Cards
_cp.create_card = function (title, icon, id, color) {
    return `
        <div class="col-md-3">
            <div class="card shadow-lg text-center p-3 border-${color}" style="height: 180px;">
                <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <i class="bi ${icon} text-${color} fs-1"></i>
                    <h6 class="mt-2">${title}</h6>
                    <h3 class="text-${color} fw-bold" id="${id}">Loading...</h3>
                </div>
            </div>
        </div>
    `;
};



// Fetch and Display Activity Reports
_cp.on.filter_list = function () {
    let _filter = '?hub=' + _app.curr_ses.user.hub_id;
    _app.get(_cp.api.list + _filter, function (data) {
        _app.log(data);
        _cp.render_view(_cp.views.tableView, data, 'x-activityreports');
        _cp.table = _cp.display_table('#tbl_activityreports');
    });
};

// Event Handlers
_cp.on.Add = () => (_app.nav_page('store.activityreport_dtl'), false);
_cp.on.Edit = () => (_app.nav_page('store.activityreport_dtl'), false);
_cp.on.Delete = (id) => (_app.del(_cp.api.list + id, () => _cp.init()), false);
_cp.on.Search = function () {
    _cp.table.search(this.value).draw();
    return false;
};

_cp.init();
