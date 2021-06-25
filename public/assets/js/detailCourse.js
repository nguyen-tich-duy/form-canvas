// Get the button that opens the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("signup-btn-1");

var btn2 = document.getElementById("signup-btn-2");

var span = document.getElementsByClassName("custom-modal-close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

btn2.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}