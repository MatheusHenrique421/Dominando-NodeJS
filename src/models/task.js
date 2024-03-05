const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  nome: { type: String, require: true },
  done: { type: Boolean, default: false },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Checklist",
    require: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
