const mongoose = require('mongoose');

const { Schema } = mongoose;
const stateSchema = require('./State');
const toolSchema = require('./Tool');

const modelSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  initialState: {
    type: String,
    required: true,
  },
  breakTime: {
    type: Number,
    required: true,
    default: 1000,
  },
  steps: {
    type: Number,
    required: true,
    default: 1,
  },
  states: [ stateSchema ],
  tools: [ toolSchema ],
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Model', modelSchema);
