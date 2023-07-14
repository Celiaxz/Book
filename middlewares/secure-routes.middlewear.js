const inSession = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  inSession,
};
