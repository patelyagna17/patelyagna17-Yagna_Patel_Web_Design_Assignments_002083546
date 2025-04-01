const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { data: Buffer }, // Store image as binary data
    // contentType: { type: String }, // Store the MIME type of the image
  });

const Image = mongoose.model("Image", imageSchema,"images");

module.exports = Image;
