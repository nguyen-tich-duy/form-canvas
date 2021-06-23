$(".datepicker").each(function () {
  new Pikaday({ field: this });
});
$("[name='password-repeat']").on("change", () => {
  console.log($("[name='password-repeat']").val());
  console.log($("[name='password']").val());
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(
      $("[name='password-repeat']").val() != $("[name='password']").val()
        ? true
        : ""
    );
});
$("[name='password']").on("change", () => {
  console.log($("[name='password-repeat']").val());
  console.log($("[name='password']").val());
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(
      $("[name='password-repeat']").val() != $("[name='password']").val()
        ? true
        : ""
    );
});
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
