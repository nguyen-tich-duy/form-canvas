// Get the button that opens the modal
var modal = document.getElementById("myModal");

var btn1 = document.getElementById("signup-btn");

var span = document.getElementsByClassName("custom-modal-close")[0];

btn1.onclick = function () {
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