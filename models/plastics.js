const mongoose = require('mongoose');

const plasticsSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  plastic_bottles: Number,
  plastic_cups: Number,
  straws: Number,
  resealable_plastic_bags: Number,
  cling_wrap: Number,
  cutlery: Number,
  stirrers: Number,
  takeout_food_containers: Number,
  grocery_bags: Number
})

const Plastics = mongoose.model('Plastics', plasticsSchema)

module.exports = Plastics;
