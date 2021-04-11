const mongoose = require('mongoose');
const regexValidator = /^[^@&*";?#/\$=*<>]+$/g;

const sauceSchema = mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true, match: regexValidator },
  description: { type: String, required: true, match: regexValidator },
  mainPepper: { type: String, required: true, match: regexValidator },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
});

module.exports = mongoose.model('Sauce', sauceSchema);
