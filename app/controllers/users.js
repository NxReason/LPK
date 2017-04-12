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
  res.json(req.body);
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

module.exports = {
  profile,
  users,
  create,
  save,
  edit,
  remove
}
