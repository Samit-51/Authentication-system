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

hotel.pre('save', async function(next){
  this.HotelId = await 
});
module.exports = mongoose.model('Hotel', hotel);