const mongoose = require('mongoose');

const hotel = mongoose.Schema({
  HotelName: {
    type: String,
    required: [true, 'Please enter the hotel name.'],
  },
  HotelId: {
    type: String,
  },
  HotelQr: {
  }
})

module.exports = mongoose.model('Hotel', hotel);