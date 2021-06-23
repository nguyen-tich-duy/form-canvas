$(".datepicker").each(function () {
  new Pikaday({ field: this });
});
$("[name='password-repeat']").on("change", () => {
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(
      $("[name='password-repeat']").val() !== $("[name='password']").val()
        ? true
        : ""
    );
});
$("[name='password']").on("change", () => {
  const regex = new RegExp("^[0-9a-zA-Z!@#$%^&*]{8,}$");
  const passwordValue = $("[name='password']").val();
  const passwordConfirm = $("[name='password-repeat']").val();
  $("[name='password']")
    .get(0)
    .setCustomValidity(!regex.test(passwordValue) ? true : "");
  $("[name='password-repeat']")
    .get(0)
    .setCustomValidity(passwordConfirm != passwordValue ? true : "");
});

function validatePhone(phone) {
  const regex = new RegExp("^[0-9]{6,15}$");
  return regex.test(phone);
}

$("[name='phone'").on("change", () => {
  var phone = $("[name='phone'").val();
  $("[name='phone'")
    .get(0)
    .setCustomValidity(!validatePhone(phone) ? true : "");
});
$(".validate-form").on("submit", (e) => {
  var phone = $("[name='phone'").val();
  if (!validatePhone(phone)) {
    e.preventDefault();
    e.stopPropagation();
    $("[name='phone'").get(0).setCustomValidity(true);
  }
});
$(".validate-form").ajaxForm({
  url: "/signin", // or whatever
  dataType: "json",
  success: function (data) {
    window.parent.location.href = data.redirect;
  },
  error: (res) => {
    if (res.status === 400) {
      $("[name='phone']").get(0).setCustomValidity("Số điện thoại đã bị trùng");
    }
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
        console.log("validate", form.checkValidity());
        if (!form.checkValidity()) {
          console.log("isValidate");
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
