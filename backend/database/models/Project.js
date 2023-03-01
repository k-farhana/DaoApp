const mongoose = require("mongoose");
// Define the Mongoose schema for the project model
const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique:true,
    },
    description: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    }
  });

  // Create the Mongoose model for the project
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;