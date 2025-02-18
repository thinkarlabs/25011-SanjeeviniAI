_cp = _app.curr_page;

_cp.init = function () {
    _cp.views.page = './app11/fe/mod01/web/aidetailreport/aidetailreport_lst.htm';
    _cp.api.list = '/app03/api/mod01/anganwadi/';

    _cp.render_page(_cp.views.page, '');
    _cp.render_summary();
    _cp.on.filter_list();

    _app.bind_event('#btnAdd', 'click', _cp.on.Add);
    _app.bind_event('#searchoveralls', 'keyup', _cp.on.Search);
};

_cp.render_summary = function () {
    let summaryHTML = `
        <div class="container mt-4">
            <div class="row g-3">
                ${_cp.create_card("Follow-ups Analysis", "bi-graph-up-arrow", "ai-followups", "primary")}
                ${_cp.create_card("Pregnancy Success Rate", "bi-heart-pulse", "ai-success-rate", "success")}
                ${_cp.create_card("Pending Follow-ups", "bi-exclamation-circle-fill", "ai-pending", "warning")}
                ${_cp.create_card("AI Follow-ups Completion", "bi-check-circle-fill", "ai-completion", "danger")}
            </div>
        </div>
    `;
    document.getElementById('x-aidetailreports').insertAdjacentHTML('beforebegin', summaryHTML);

    // Fetch AI Detail Report Data
    _cp.fetch_ai_detail_data();
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

// Fetch AI Detail Report Data
_cp.fetch_ai_detail_data = function () {
    let _filter = '?hub=' + _app.curr_ses.user.hub_id;
    _app.get(_cp.api.list + 'ai_detail_summary' + _filter, function (data) {
        document.getElementById('ai-followups').innerText = data.followups_analysis || "0%";
        document.getElementById('ai-success-rate').innerText = data.pregnancy_success_rate || "0%";
        document.getElementById('ai-pending').innerText = data.pending_followups || "0 Cases";
        document.getElementById('ai-completion').innerText = data.followups_completion || "0%";
    });
};



// Fetch and Display AI Detail Reports
_cp.on.filter_list = function () {
    let _filter = '?hub=' + _app.curr_ses.user.hub_id;
    _app.get(_cp.api.list + _filter, function (data) {
        _app.log(data);
        _cp.render_view(_cp.views.tableView, data, 'x-aidetailreports');
        _cp.table = _cp.display_table('#tbl_aidetailreports');
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
