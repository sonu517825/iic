const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    post: {
      type: String,
      required: true,
      enum: ["backend", "frontend", "testing", "development", "deployment"],
    },
    description: { type: String, required: true },
    // file: { type: String, required: true },
  },
  { timestamps: true }
);
const _schema = mongoose.model("postSubmissions", Schema);

module.exports = _schema;
