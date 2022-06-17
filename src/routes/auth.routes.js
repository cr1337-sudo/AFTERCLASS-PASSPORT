const { Router } = require("express");
const router = Router();
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");
//Home
router.get("/", (_, res) => {
  res.render("index");
});

//Login
router.get("/login", (req, res) => {
  res.render("./auth/login");
});

// Para trabajar con APIS!
router.post("/login", (req, res) => {
  passport.authenticate(
    "local-login",
    { failureRedirect: "/error" },
    (error, user, options) => {
      if (user) {
        return res.json(user);
      } else if (options) {
        return res.json(options);
      }
    }
  )(req, res);
});

// router.post(
//   "/login",
//   passport.authenticate("local-login", { failureRedirect: "/error" }),
//   (req, res) => {
//     res.render("./main/profile");
//   }
// );
// //Register
// router.get("/register", (_, res) => {
//   res.render("./auth/register");
// });

router.post(
  "/register",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/error",
    //Para pasar en el req los datos recibidos desde el cliente
    passReqToCallback: true,
  })
);

router.get("/logout",  isAuthenticated,(req, res) => {
  res.render("./auth/logout");
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

//Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("./main/profile");
  }
);

//Error
router.get("/error", (_, res) => {
  res.render("error");
});
module.exports = router;
