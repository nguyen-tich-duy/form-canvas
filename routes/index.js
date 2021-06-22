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
    axios({
      method: "post",
      url:
        "https://beta.lms.flexidata.vn/api/v1/accounts/1/users?pseudonym[password]=" +
        req.body.password +
        "&pseudonym[unique_id]=" +
        req.body.email +
        "&user[name]=" +
        req.body.name,
      data: {},
      headers: {
        Authorization:
          "Bearer " +
          "CBiKFo4ZHFEcued8yUc5uZlr2wgXoX7RdOxXsAfbPGlB5Rh7TTI4JX7dRVbEHy19", //the token is a variable which holds the token
      },
    })
      .then((response) => {
        Promise.all([
          axios({
            method: "post",
            url: `https://beta.lms.flexidata.vn/api/v1/courses/1/enrollments?enrollment[user_id]=${response.data.id}&enrollment[type]=StudentEnrollment&enrollment[enrollment_state]=active`,
            headers: {
              Authorization:
                "Bearer " +
                "CBiKFo4ZHFEcued8yUc5uZlr2wgXoX7RdOxXsAfbPGlB5Rh7TTI4JX7dRVbEHy19", //the token is a variable which holds the token
            },
          }),
          axios({
            method: "put",
            url: `https://beta.lms.flexidata.vn/api/v1/users/${response.data.id}/custom_data`,
            data: {
              ns: "beta.lms.flexidata.vn",
              data: {
                job: req.body.jobs,
                gender: req.body.gender,
                phone: req.body.phone,
                provide: req.body.provide,
                hometown: req.body.hometown,
              },
            },
            headers: {
              Authorization:
                "Bearer CBiKFo4ZHFEcued8yUc5uZlr2wgXoX7RdOxXsAfbPGlB5Rh7TTI4JX7dRVbEHy19", //the token is a variable which holds the token
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
        ])
          .then(() => {
            // axios({
            //   method: "post",
            //   url: "https://beta.lms.flexidata.vn/login/canvas",
            //   data: {
            //     authenticity_token:
            //       "Fh7vR5upR7h5GxLbHCUtIVjgLHWOI+3vdjxljpoHpjtDU5x1qtFz3zBuWe96Y2RDNKZ7G/xwvIAPcQG98TeQCA==",
            //     "pseudonym_session[unique_id]": "canvas@classcom.app",
            //     "pseudonym_session[password]": "Flexidata1234",
            //     redirect_to_ssl: 1,
            //   },
            // })
            //   .then((res) => {
            //   })
            //   .catch((errors) => {
            //     console.log(errors);
            //   });
            res.redirect("https://beta.lms.flexidata.vn");
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
    // res.redirect(
    //   "https://testing-library.com/docs/react-testing-library/example-intro"
    // );
  }
);
module.exports = router;
