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
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
$("[name='email'").on("change", () => {
  var email = $("[name='email'").val();
  console.log(email);
  $("[name='email'")
    .get(0)
    .setCustomValidity(validateEmail(email) ? true : "");
});
$(".validate-form").ajaxForm({
  url: "/resignter", // or whatever
  dataType: "json",
  success: (res) => {
    $("[name='email']").get(0).setCustomValidity("");
  },
  error: (res) => {
    $("[name='email']").get(0).setCustomValidity(true);
  },
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
