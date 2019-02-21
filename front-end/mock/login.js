
export default {
  'get /api/get/loginStatus': function (req, res, next) {
    res.json({
      result: {
        // loginStatus:"notLoggedIn",
        // loginStatus: "userLogged",
        loginStatus: "sellerLoggedIn",
      }
    });
  },
}
