/** @format */
const db = require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

module.exports.index = (req, res) => {
  const userInfor = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();

  console.log("this is userInfo:", userInfor);
  res.render("profile/index", { user: userInfor });
};

module.exports.updateAvatar = (req, res) => {
  res.render("profile/update");
};

module.exports.Postupdate = (req, res) => {
  const upload = multer({ storage }).single("avatar");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log("file uploaded to server");
    console.log(req.file);

    // SEND FILE TO CLOUDINARY
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.APIKEY,
      api_secret: process.env.APISECRET,
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `avatar/${uniqueFilename}`, tags: `avatar` }, // directory and tags are optional
      function (err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        console.log(image.url);
        db.get("users")
          .find({ id: req.signedCookies.userId })
          .assign({ avatar: image.url })
          .write();
        res.redirect("/profile");
      }
    );
  });
};
