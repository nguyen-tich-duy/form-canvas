$(".datepicker").each(function () {
  new Pikaday({ field: this });
});
// call api
$.ajax({
  type: "GET",
  url: "/city",
  success: (res) => {
    Array.from(res.data).forEach((element) => {
      $("[name='province']").append(`<option value='${element.SolrID}'>${element.Title}</option>`)
      $("[name='hometown']").append(`<option value='${element.SolrID}'>${element.Title}</option>`)
    });
  }
})
// validate
$("#hasAccount").on("click", () => {
  window.parent.location.href = "https://iom.lms.flexidata.vn/login/canvas";
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
  const regex = new RegExp("^[0-9]{1,20}$");
  return regex.test(phone);
}
$("[name='phone'").on("change", () => {
  var phone = $("[name='phone'").val();
  if (!validatePhone(phone)) {
    $("#validate-phone").html(
      "  Vui lòng điền số điện thoại bao gồm ít nhất một chữ số và tối đa là 20 số, không có khoảng trắng, chữ cái và kí tự đặc biệt"
    );
  }
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
  if (form.checkValidity()) {
    const phone = $("[name='phone']").val();
    const name = $("[name='name']").val();
    const gender = $("[name='gender]'").children("option:selected").val();
    const job = $("[name='job'").val();
    const email = $("[name='email'").val();
    const province = $("[name='province']").children("option:selected").val();
    const hometown = $("[name='hometown']").children("option:selected").val();
    const password = $("[name='password']").val();
    const passwordConfirm = $("[name='password-repeat']").val();
    $.ajax({
      type: "POST",
      data: { phone, name, password, passwordConfirm, email, gender, job, province, hometown },
      url: "/signin", // or whatever
      dataType: "json",
      success: function (data) {
        window.parent.location.href = data.redirect;
      },
      error: (error) => {
        $("#validate-phone").html(error.responseJSON.message);
        $("[name='phone']").get(0).setCustomValidity(true);
      },
    });
  }
});
