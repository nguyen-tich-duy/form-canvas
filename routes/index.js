var express = require("express");
var axios = require("axios");
const { body, validationResult, checkSchema } = require("express-validator");

var router = express.Router();
const registrationSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Họ và tên không được để trống",
  },
  phone: {
    notEmpty: true,
    isMobilePhone: true,
    errorMessage: "Số điện thoại không hợp lệ hoặc để trống",
  },
  email: {
    normalizeEmail: true,
    // custom: {
    //   options: (value) => {
    //     return User.find({
    //       email: value,
    //     }).then((user) => {
    //       if (user.length > 0) {
    //         return Promise.reject("Email address already taken");
    //       }
    //     });
    //   },
    // },
  },
  password: {
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
  },
};
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Form canvas" });
});

router.post(
  "/",
  checkSchema(registrationSchema),
  body("password-repeat").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Handle the request
    axios
      .post("https://beta.lms.flexidata.vn/api/v1/accounts/1/users", {
        params: {
          "pseudonym[password]": "123456789",
          "pseudonym[unique_id]": "duy.nguyen1234@classcom.app",
          "pseudonym[short_name]": "duy",
          "pseudonym[name]": "nguyentichduy",
        },
        headers: {
          Authorization:
            "Bearer " +
            "CBiKFo4ZHFEcued8yUc5uZlr2wgXoX7RdOxXsAfbPGlB5Rh7TTI4JX7dRVbEHy19", //the token is a variable which holds the token
        },
      })
      .then((res) => {
        res.status(200).json({
          success: true,
          message: "Registration successful",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
);
module.exports = router;
