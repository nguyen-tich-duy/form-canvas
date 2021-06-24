var express = require("express");
var axios = require("axios");
const { body, validationResult, checkSchema } = require("express-validator");
var path = require("path");

var router = express.Router();

const registrationSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Họ và tên không được để trống",
  },
  phone: {
    notEmpty: true,
    errorMessage: "Số điện thoại không hợp lệ hoặc để trống",
  },
  // email: {
  //   normalizeEmail: true,
  // },
  // password: {
  //   // isStrongPassword: {
  //   //   minLength: 4,
  //   // },
  //   errorMessage: "Mật khẩu không được ít hơn 4 kí tự",
  // },
};
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Form canvas" });
});
router.get("/about", (req, res, next) => {
  res.sendFile("About.html", { root: "./public" });
});
router.get("/course", (req, res, next) => {
  res.sendFile("Course.html", { root: "./public" });
});
router.get("/courseDetail", (req, res, next) => {
  res.sendFile("./DetailCourse.html", { root: "./public" });
});
router.get("/signin", (req, res, next) => {
  res.sendFile("./resignter.html", { root: "./public" });
});
router.post(
  "/signin",
  checkSchema(registrationSchema),
  body("passwordConfirm").custom((value, { req }) => {
    console.log(value);
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: "Password confirmation",
        message: "Mật khẩu xác nhận không chính xác",
      });
    }
    // Handle the request
    axios({
      method: "post",
      url:
        "https://beta.lms.flexidata.vn/api/v1/accounts/1/users?pseudonym[password]=" +
        req.body.password +
        "&pseudonym[unique_id]=" +
        req.body.phone +
        "&user[name]=" +
        req.body.name +
        "&destination=https://beta.lms.flexidata.vn/courses/1",
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
                email: req.body.email,
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
            res.status(200).send({ redirect: response.data.destination });
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch(function (error) {
        console.log(error);
        res.status(400).send({
          error: "phone duplicate",
          message: "Số điện thoại đã tồn tại trong hệ thống",
        });
      });
  }
);
module.exports = router;
