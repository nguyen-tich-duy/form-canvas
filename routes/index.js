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
    errorMessage: "Số điện thoại không hợp lệ hoặc để trống",
  },
  // email: {
  //   normalizeEmail: true,
  // },
  password: {
    isLength: {
      errorMessage: 'Mật khẩu phải tối thiểu là 8 kí tự',
      options: { min: 8 },
    },
  },
}
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
router.get("/city", (req, res, next) => {
  axios("https://thongtindoanhnghiep.co/api/city")
    .then((response) => {
      res.status(200).send({ data: response.data.LtsItem });
    })
    .catch(() => {
      res
        .status(400)
        .send({ error: "Error data provinde", message: "Url data is wrong" });
    });
});
router.get("/signin", (req, res, next) => {
  res.sendFile("./register.html", { root: "./public" });
});
router.post(
  "/signin",
  checkSchema(registrationSchema),
  body("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
         errors,
      );
    }
    // Handle the request
    axios({
      method: "post",
      url:
        "https://iom.lms.flexidata.vn/api/v1/accounts/1/users?pseudonym[password]=" +
        req.body.password +
        "&pseudonym[unique_id]=" +
        req.body.phone +
        "&user[name]=" +
        encodeURIComponent(req.body.name) +
        "&destination=https://iom.lms.flexidata.vn/courses/4",
      data: {},
      headers: {
        Authorization:
          "Bearer qHlo9ItOjrVyJ4pcxv9jzNXbxSo2TwqBFM68xascCWm45IrrKVDNAdZmFUaaRX2f", //the token is a variable which holds the token
      },
    })
      .then((response) => {
        Promise.all([
          axios({
            method: "post",
            url: `https://iom.lms.flexidata.vn/api/v1/courses/4/enrollments?enrollment[user_id]=${response.data.id}&enrollment[type]=StudentEnrollment&enrollment[enrollment_state]=active`,
            headers: {
              Authorization:
                "Bearer qHlo9ItOjrVyJ4pcxv9jzNXbxSo2TwqBFM68xascCWm45IrrKVDNAdZmFUaaRX2f", //the token is a variable which holds the token
            },
          }),
          axios({
            method: "put",
            url: `https://iom.lms.flexidata.vn/api/v1/users/${response.data.id}/custom_data`,
            data: {
              ns: "iom.lms.flexidata.vn",
              data: {
                job: req.body.job,
                gender: req.body.gender,
                email: req.body.email,
                province: req.body.province,
                hometown: req.body.hometown,
              },
            },
            headers: {
              Authorization:
                "Bearer qHlo9ItOjrVyJ4pcxv9jzNXbxSo2TwqBFM68xascCWm45IrrKVDNAdZmFUaaRX2f", //the token is a variable which holds the token
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }),
        ])
          .then(() => {
            res.status(200).send({ redirect: response.data.destination });
          })
          .catch((error) => {
            res
              .status(400)
              .send({
                error: "custom data",
                message: "Please check your datas or your course",
                systemerror: error,
              });
          });
      })
      .catch(function (error) {
        res.status(400).send({
          error: "DuplicatePhone",
          message: "Số điện thoại đã tồn tại trong hệ thống",
          systemerror: error,
        });
      });
  }
);
module.exports = router;
