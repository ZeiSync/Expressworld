let reqServer = 0;
module.exports.cookie = (req, res, next) => {
  console.log({ cookies: (reqServer += 1) });
  next();
};
