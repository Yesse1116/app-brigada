const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
