const Hotel= require('../modules/Hotel');

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


