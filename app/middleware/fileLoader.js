const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    const parts = file.originalname.split('.');
    const ext = parts[parts.length - 1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
