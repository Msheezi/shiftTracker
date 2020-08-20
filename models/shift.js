const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ShiftSchema = new Schema({
  startDateTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDateTime: {
    type: Date,
    default: null,
  },
  startingUrl: {
    type: String,
    default: "",
  },
  endingUrl: {
    type: String,
    default: "",
  },
  shiftDuration: {
    type: String,
    default: "0.0",
  },
  startMiles: {
    type: Number,
    default: 0,
  },
  endMiles: {
    type: Number,
    default: 0,
  },
  ttlMiles: {
    type: Number,
    default: 0,
  },
  tips: {
    type: Number,
    default: 0,
  },
  ttlComp: {
    type: String,
    default: "0.00",
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Shift = mongoose.model("shifts", ShiftSchema)