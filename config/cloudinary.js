const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'mavis',
  api_key: '746133862398682',
  api_secret: 'akfBt9xXBme8L5JW1tn9cjePsMY',
});

module.exports = cloudinary;
