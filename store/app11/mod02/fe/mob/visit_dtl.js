_cp = _app.curr_page;
console.log("good afternoon");

_cp.init = function () {
    _cp.views.page = "./app11/fe/mod02/mob/visit_dtl.htm";
    _cp.api.item = "/app03/api/mod01/anganwadi/";

    // If params exist, it's in EDIT mode; otherwise, it's in ADD mode.
    if (_cp.params !== "") {
        _app.get(_cp.api.item + _cp.params, function (item_data) {
            _cp.render_page(_cp.views.page, item_data);
            _cp.load();
        });
    } else {
        _cp.render_page(_cp.views.page, "");
        _cp.load();
    }
};

// FILTER
_cp.load = function () {
    _app.bind_event("#btnCancel", "click", _cp.on.Cancel);
    _app.bind_event("#btnSave", "click", _cp.on.Save);
};

// CANCEL
_cp.on.Cancel = function () {
    _app.nav_page("mob.visit_lst");
    return false;
};

// SAVE
_cp.on.Save = function () {
    _app.nav_page("mob.visit_lst");
    return false;
};

// Function to start the camera
function startCamAndCapture() {
    var video = document.getElementById("video");
    var photo = document.getElementById("photo");
    var startCamBtn = document.getElementById("startcam");
    var takePicBtn = document.getElementById("takepic");

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function (mediaStream) {
            video.srcObject = mediaStream;
            video.style.display = "block";
            photo.style.display = "none";
            takePicBtn.style.display = "block";
            startCamBtn.style.display = "none";
            video.play();

            // Store stream reference in video element for stopping later
            video.dataset.streamId = mediaStream.id;
        })
        .catch(function (err) {
            console.error("Error starting camera:", err);
        });
}

// Function to take the picture
function takePic() {
    var canvas = document.getElementById("canvas");
    var video = document.getElementById("video");
    var photo = document.getElementById("photo");
    var takePicBtn = document.getElementById("takepic");
    var startCamBtn = document.getElementById("startcam");
    var picb64 = document.getElementById("mem_pic");

    var context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capture frame from video
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageData = canvas.toDataURL("image/jpeg", 0.7);

    // Set image and input value
    photo.src = imageData;
    picb64.value = imageData;

    // Hide video, show captured image
    photo.style.display = "block";
    video.style.display = "none";
    takePicBtn.style.display = "none";
    startCamBtn.style.display = "block";

    // Stop camera stream after capture
    let mediaStream = video.srcObject;
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    // Fetch user location and date-time
    getLocation();
    setCaptureDateTime();
}

// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to show user's location
function showPosition(position) {
    document.getElementById("loc_lat").innerText = position.coords.latitude;
    document.getElementById("loc_lon").innerText = position.coords.longitude;
    document.getElementById("locationFields").style.display = "block"; // Show location fields
}

// Function to set the current date and time
function setCaptureDateTime() {
    let now = new Date();
    let dateString = now.toLocaleDateString(); // Format: MM/DD/YYYY
    let timeString = now.toLocaleTimeString(); // Format: HH:MM:SS AM/PM
    document.getElementById("capture_datetime").innerText = dateString + " " + timeString;
}

// Handle geolocation errors
function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

_cp.init();
