const User = require('../database/models').User;

const profile = (req, res) => {
  res.render('user', { path: null, user: req.session.user });
}

const users = (req, res) => {
  User.findAll()
  .then(users => res.render('users', { path: '/admin', users, user: req.session.user }))
  .catch(err => {
    res.render('error', { code: 505, message: 'Не удалось получить список пользователей' })
  });
}

const create = (req, res) => {
  res.render('userForm', {
    user: req.session.user,
    path: '/admin',
    action: '/admin/users/new',
    method: 'POST',
    editedUser: {}
  });
}

const save = (req, res) => {
  const { username, password, firstname, lastname, email, level } = req.body;
  User.create({
    username, password, firstname, lastname, email, level
  })
  .then(user => res.json({ created: true }))
  .catch(err => res.json({ created: false, message: err.message }));
}

const edit = (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .then(user => {
    if (!user) {
      res.status(404).render('error', {
        code: 404,
        message: 'Не удалось найти данного пользователя'
      });
    } else {
      res.render('userForm', {
        user: req.session.user,
        path: '/admin',
        action: '',
        method: '',
        editedUser: user,
      });
    }
  })
  .catch(err => {
    res.status(500).render('error', {
      code: 500,
      message: 'Не удалось получить данные о пользователе'
    });
  });
};

const remove = (req, res) => {
  res.json({ message: `user with id: ${req.params.id} was deleted` });
};

const exists = (req, res) => {
  const key = Object.keys(req.query)[0];
  const value = req.query[key];
  User.findOne({
    where: { [key]: value }
  })
  .then(user => {
    if (!user) res.json({ exists: false });
    else res.json({ exists: true });
  })
  .catch(err => res.json({ error: true, status: 500, msg: err.message }));
}

module.exports = {
  profile,
  users,
  create,
  save,
  edit,
  remove,
  exists
}
