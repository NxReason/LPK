const mongoose = require('mongoose');

const toolSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: 'Tool name',
  },
  type: {
    type: String,
    required: true,
    enum: [ 'range', 'switch' ],
    default: 'range',
  },
  rangeValues: {
    min: Number,
    max: Number,
  },
});

module.exports = toolSchema;
