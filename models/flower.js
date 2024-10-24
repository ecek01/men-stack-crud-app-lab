const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  description: String,
  image: String,
});

const Flower = mongoose.model('Flower', flowerSchema);
module.exports = Flower;