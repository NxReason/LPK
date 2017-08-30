const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  maxSteps: {
    type: Number,
    required: true,
  },
  datePassed: {
    type: Date,
    required: true,
    default: Date.now,
  },
  states: [
    {
      name: { type: String, required: true },
      maxTime: { type: Number, required: true },
      spentTime: { type: Number, required: true },
      actionsNumber: { type: Number, required: true },
      inactive: { type: Boolean, required: true },
    },
  ],
});

module.exports = reportSchema;
