const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'No image name',
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Image', imageSchema);
