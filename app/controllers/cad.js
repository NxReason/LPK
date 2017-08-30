const { Image } = require('../database').models;

const cad = (req, res) => {
  Image.findAll({ raw: true })
  .then((images) => {
    res.render('cad', { user: req.session.user, path: req.path, images });
  })
  .catch((err) => {
    console.log(err.message);
    res.render('error', { code: 500, message: 'Не удалось получить изображения для состояний' });
  });
};

const galery = (req, res) => {
  Image.find({ })
  .then((images) => {
    res.render('galery', { path: '/galery', user: req.session.user, images });
  })
  .catch((err) => {
    console.log(err.message);
    res.render('error', { code: 500, message: 'Не удалось получить список фотографий' });
  });
};

const saveImage = (req, res) => {
  const { name } = req.body;
  const url = req.file.filename;
  Image.create({ name, url })
  .then((img) => {
    res.status(200).json({ _id: img._id, name: img.name, url: img.url });
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).json({ message: 'Oops. Something went wrong' });
  });
};

const saveModel = (req, res) => {
  // todo
  res.send('Not implemented');
};

module.exports = {
  cad,
  galery,
  saveImage,
  saveModel,
};
