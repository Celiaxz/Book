// middleware/route-guard.js
// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  console.log("loggedIn: ", req.session.currentUser);
  if (!req.session.currentUser) {
    console.log("isLoggedIn: redirect to login");
    console.log("currentUser: ", req.session.currentUser);
    return res.redirect("/");
  }
  console.log("isLoggedIn: take me to next page");
  next();
};
// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect("/profile");
  }
  console.log("isLoggedOut: take me to next page");
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
