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
$("#register-form").on("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const form = $("#register-form").get(0);
  form.classList.add("was-validated");
  var phone = $("[name='phone']").val();
  if (!validatePhone(phone)) {
    $("[name='phone'").get(0).setCustomValidity(true);
  }
  console.log("form.checkValidity()", form.checkValidity());
  if (form.checkValidity()) {
    const phone = $("[name='phone']").val();
    const name = $("[name='name']").val();
    const password = $("[name='password']").val();
    console.log("{ phone, name, password }", { phone, name, password });
    $.ajax({
      type: "POST",
      data: { phone, name, password, "password-repeat": password },
      url: "/signin", // or whatever
      dataType: "json",
      success: function (data) {
        window.parent.location.href = data.redirect;
      },
      error: (error) => {
        console.log(error);
        $("[name='phone']").get(0).setCustomValidity(true);
      },
    });
  }
});
