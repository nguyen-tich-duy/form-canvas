$(".datepicker").each(function () {
  new Pikaday({ field: this });
});
$("[name='password-repeat']").on("change", () => {
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(
      $("[name='password-repeat']").val() != $("[name='password']").val()
        ? true
        : ""
    );
});
$("[name='password']").on("change", () => {
  const regex = new RegExp("^[0-9a-zA-Z!@#$%^&*]{4,}$");
  const passwordValue = $("[name='password']").val();
  const passwordConfirm = $("[name='password-repeat']").val();
  console.log(passwordValue, regex.test(passwordValue));
  $("[name='password']")
    .get(0)
    .setCustomValidity(!regex.test(passwordValue) ? true : "");
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(passwordConfirm != passwordValue ? true : "");
});
function validateEmail(email) {
  const regex = new RegExp("^S+@S+$");
  return regex.test(email);
}
$("[name='email'").on("change", () => {
  var email = $("[name='email'").val();
  $("[name='email'")
    .get(0)
    .setCustomValidity(validateEmail(email) ? true : "");
});
$(".validate-form").ajaxForm({
  url: "/signin", // or whatever
  dataType: "json",
  success: function (data) {
    window.parent.location.href = data.redirect;
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
