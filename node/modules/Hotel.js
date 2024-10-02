const mongoose = require('mongoose');

const hotel = mongoose.Schema({
  HotelName: {
    type: String,
    unique: true,
    required: [true, 'Please enter the hotel name.']
  },
  HotelId: {
    type: String,
  },
  HotelQr: {
    type: String
  }
})

hotel.pre('save', async function(next){
  this.HotelId = await Math.floor(1000+ Math.random()*9000).toString();
})
module.exports = mongoose.model('Hotel', hotel);