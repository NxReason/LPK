const { User } = require('../database').models;
const Report = require('../lib/report');

const profile = (req, res) => {
  User.findOne({ _id: req.session.user._id })
    .then(user => Report.format(user.reports))
    .then(reports => res.render('user', { path: null, user: req.session.user, reports }))
    .catch((err) => {
      console.log(err.message);
      res.render('user', { path: null, user: req.session.user, reports: null });
    });
};

const users = (req, res) => {
  User.find({ })
  .then(data => res.render('users', { path: '/admin', users: data, user: req.session.user }))
  .catch((err) => {
    console.log(err);
    res.render('error', { code: 505, message: 'Не удалось получить список пользователей' })
  });
};

const create = (req, res) => {
  res.render('userForm', {
    user: req.session.user,
    path: '/admin',
    action: '/admin/users/new',
    method: 'POST',
    editedUser: { },
  });
};

const save = (req, res) => {
  const { username, password, firstname, lastname, email, level } = req.body;
  User.create({ username, password, firstName: firstname, lastName: lastname, email, level })
  .then(() => res.json({ created: true }))
  .catch(err => res.json({ created: false, message: err.message }));
};

const edit = (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
  .then((user) => {
    if (!user) {
      res.status(404).render('error', {
        code: 404,
        message: 'Не удалось найти данного пользователя'
      });
    } else {
      res.render('userForm', {
        user: req.session.user,
        path: '/admin',
        action: '/admin/users/update',
        method: 'POST',
        editedUser: user,
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).render('error', {
      code: 500,
      message: 'Не удалось получить данные о пользователе'
    });
  });
};

const update = (req, res) => {
  User.findOne({ _id: req.body.id })
  .then((user) => {
    user.username = req.body.username;
    if (req.body.password !== '') user.password = req.body.password;
    user.firstName = req.body.firstname;
    user.lastName = req.body.lastname;
    user.email = req.body.email;
    user.level = req.body.level;
    return user.save();
  })
  .then(() => res.json({ updated: true }))
  .catch(err => res.json({ updated: false, message: err.message }));
}

const remove = (req, res) => {
  const { _id } = req.params;
  User.remove({ _id })
  .then(() => {
    res.json({ deleted: true });
  })
  .catch((err) => {
    console.log(err);
    res.json({ deleted: false, message: err.message });
  });
};

const exists = (req, res) => {
  const { username } = req.query;
  User.findOne({ username })
  .then((user) => {
    if (!user) res.json({ exists: false });
    else res.json({ exists: true });
  })
  .catch(err => res.json({ error: true, status: 500, msg: err.message }));
};

module.exports = {
  profile,
  users,
  create,
  save,
  edit,
  update,
  remove,
  exists,
}
