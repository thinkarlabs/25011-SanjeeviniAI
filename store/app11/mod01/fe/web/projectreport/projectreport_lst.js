_cp = _app.curr_page;

_cp.init = function () {
    _cp.views.page = './app11/fe/mod01/web/projectreport/projectreport_lst.htm';
    _cp.api.list = '/app03/api/mod01/anganwadi/';

    _cp.render_page(_cp.views.page, '');
    _cp.render_summary();
    _cp.on.filter_list();

    _app.bind_event('#btnAdd', 'click', _cp.on.Add);
    _app.bind_event('#searchhospitals', 'keyup', _cp.on.Search);
};

_cp.render_summary = function () {
    let summaryHTML = `
        <div class="container mt-4">
            <div class="row g-3">
                ${_cp.create_card("Total Farmers", "bi-people-fill", "total-farmers", "primary")}
                ${_cp.create_card("Total Cattle", "bi-cow", "total-cattle", "success")}
                ${_cp.create_card("Total AI Requests", "bi-file-earmark-text", "total-ai-requests", "warning")}
                ${_cp.create_card("AI Visits Completed", "bi-check-circle-fill", "total-ai-visits", "info")}
            </div>

            <div class="row g-3 mt-3">
                ${_cp.create_card("Total Follow-ups", "bi-repeat", "total-followups", "danger")}
                ${_cp.create_card("Total Paravets & MAITRI Workers", "bi-person-badge", "total-paravets", "secondary")}
                ${_cp.create_card("Total Hospitals Included", "bi-hospital", "total-hospitals", "primary")}
                ${_cp.create_card("Total Paravet Login Count", "bi-key-fill", "total-paravet-logins", "success")}
            </div>
        </div>
    `;
    document.getElementById('x-projectreports').insertAdjacentHTML('beforebegin', summaryHTML);
    _cp.fetch_project_data();
};

// Function to Create Each Card with Fixed Size
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


// Fetch AI Insemination Data
_cp.fetch_project_data = function () {
    let _filter = '?hub=' + _app.curr_ses.user.hub_id;
    _app.get(_cp.api.list + 'project_summary' + _filter, function (data) {
        document.getElementById('total-farmers').innerText = data.total_farmers || "0";
        document.getElementById('total-cattle').innerText = data.total_cattle || "0";
        document.getElementById('total-ai-requests').innerText = data.total_ai_requests || "0";
        document.getElementById('total-ai-visits').innerText = data.total_ai_visits || "0";
        document.getElementById('total-followups').innerText = data.total_followups || "0";
        document.getElementById('total-paravets').innerText = data.total_paravets || "0";
        document.getElementById('total-hospitals').innerText = data.total_hospitals || "0";
        document.getElementById('total-paravet-logins').innerText = data.total_paravet_logins || "0";
    });
};

// Fetch Project Reports
_cp.on.filter_list = function () {
    let _filter = '?hub=' + _app.curr_ses.user.hub_id;
    _app.get(_cp.api.list + _filter, function (data) {
        _app.log(data);
        _cp.render_view(_cp.views.tableView, data, 'x-projectreports');
        _cp.table = _cp.display_table('#tbl_projectreports');
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
