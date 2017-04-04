function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else if (req.headers && !req.headers.referer) {
    // Если запрос пришел от пользователя, а не от страницы
    // Сохранить путь для дальнейшего перенаправления после авторизации
    req.session.requestedPath = req.path;
    console.log('Saved path:', req.path);
    res.redirect('/login');
  } else {
    res.sendStatus(404);
  }
  // req.session.user = {
  //   id: 1,
  //   level: 'admin',
  //   username: 'admin',
  //   firstname: 'john',
  //   lastname: 'doe',
  //   email: 'example@mail.com'
  // };
  // next();
}

module.exports = auth;
