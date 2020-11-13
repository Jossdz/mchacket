exports.setLocalsUser = app => (req, res, next) => {
  if (req.user) {
    app.locals.user = req.user
    next()
  } else {
    app.locals.user = null
    next()
  }
}
