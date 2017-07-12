const { Image } = require('../database/models');

const cad = (req, res) => {
  res.render('cad', { user: req.session.user, path: req.path });
};

const galery = (req, res) => {
  Image.findAll({ raw: true })
  .then((images) => {
    res.render('galery', { path: '/galery', user: req.session.user, images });
  })
  .catch((err) => {
    console.log(err.message);
    res.render('error', { code: 500, message: 'Не удалось получить список фотографий' });
  });
};

const saveImage = (req, res) => {
  console.log(req.file);
  const { name } = req.body;
  const link = req.file.filename;
  Image.create({ name, link })
  .then((img) => {
    res.status(200).json({ id: img.id, name: img.name, link: img.link });
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).json({ message: 'Oops. Something went wrong' });
  });
};

module.exports = {
  cad,
  galery,
  saveImage,
};
