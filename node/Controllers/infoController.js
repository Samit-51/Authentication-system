const Hotel= require('../modules/Hotel');

module.exports.getHotels = async(req,res)=>{
  const hotels = await Hotel.find();
  res.send({ Hotels: hotels});
}
module.exports.addHotels = async (req, res)=>{
  const { HotelName }= req.body;
  let errors = { HotelName };
  try{
    const hotel = await Hotel.create({
      HotelName: HotelName
    })
    res.send('Verified');
  }catch(err){
    if (err.message.includes('Hotel validation failed')) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
      console.log(errors);
    });
    res.send({errors});
    }
  }
}


