/** @format */
const db = require("../db");
module.exports.index = (req, res) => {
  const userInfor = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();
  res.render("profile/index", { user: userInfor });
};

module.exports.updateAvatar = (req, res) => {
  res.render("profile/update");
};

module.exports.Postupdate = (req, res) => {
  if (res.errors.length) {
    res.redirect("/profile");
    return;
  }

  db.get("users")
    .find({ id: req.signedCookies.userId })
    .assign({ avatarUrl: res.uploadResults.url })
    .write();
  res.redirect("/profile");
};
