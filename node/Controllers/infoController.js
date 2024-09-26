const Hotel= require('../modules/Hotel');

module.exports.getHotels = async(req,res)=>{
  const hotels = await Hotel.find();
  res.send({ Hotels: hotels})
}
module.exports.addHotels = async (req, res)=>{
  const { HotelName }= req.body;
  console.log(req.body);
  try{
    const hotel = await Hotel.create({
      HotelName: HotelName
    })
    res.send('Verified');
  }catch(e){
    console.log(e.message)
  }
}


