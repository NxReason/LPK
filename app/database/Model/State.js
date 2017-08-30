const mongoose = require('mongoose');

const { Schema } = mongoose;

const stateSchema = Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: 'No state name',
  },
  img: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Image',
  },
  parameters: [
    { name: { type: String, required: true }, value: { type: Number, required: true, default: 0 } },
  ],
  event: {
    name: { type: String, required: true, default: 'Event name' },
    desc: { type: String, required: true, default: 'Event description' },
  },
  last: Boolean,
  actions: [{
    time: { min: Number, max: Number },
    nextState: {
      type: String,
      ref: 'State',
    },
    tools: [
      {
        id: String,
        type: {
          type: String,
          enum: [ 'range', 'switch' ],
          default: 'range',
        },
        switchValue: Boolean,
        rangeValues: [ Number ],
      },
    ],
    inactive: {
      type: Boolean,
      required: true,
      default: false,
    },
  }],
});

module.exports = stateSchema;
