const mongoose = require('mongoose');

const plasticsSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  plastic_bottles: { type: Number, required: true},
  plastic_cups: { type: Number, required: true },
  straws: { type: Number, required: true },
  resealable_plastic_bags: { type: Number, required: true },
  cling_wrap: { type: Number, required: true },
  cutlery: { type: Number, required: true },
  stirrers: { type: Number, required: true },
  takeout_food_containers: { type: Number, required: true },
  grocery_bags: { type: Number, required: true }
})

const Plastics = mongoose.model('Plastics', plasticsSchema)

module.exports = Plastics;
