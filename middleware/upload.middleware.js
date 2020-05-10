/** @format */
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports.uploadResults = () => {
  return (req, res, next) => {
    let errors = [];
    const upload = multer({ storage }).single("avatar");
    upload(req, res, (err) => {
      if (err) {
        return res.send(err);
      }

      console.log("file uploaded to server");
      console.log(req.file);

      if (!req.file) {
        errors.push("File do not exist");
        res.errors = errors;
        next();
        return;
      }

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
        (err, image) => {
          if (err) return res.send(err);
          console.log("file uploaded to Cloudinary");
          // remove file from server
          const fs = require("fs");
          fs.unlinkSync(path);
          // return image details
          res.uploadResults = image;
          next();
        }
      );
    });
  };
};
