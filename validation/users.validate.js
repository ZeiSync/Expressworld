module.exports.postCreate = (req, res, next) => {
  let errors = [];

  if (!req.body.name) {
    errors.push("Name is require");
  }

  if (req.body.name.length > 30) {
    errors.push("Name too loooong");
  }

  if(!req.body.email) {
    errors.push("Email is REQUIRE");
  }
  
  if(!req.body.password) {
    errors.push("password is REQUIRE");
  }
  
  if (errors.length) {
    res.render("users/create", {
      name: req.body.name,
      errors: errors
    });
    return;
  }
  
  

  next();
};
