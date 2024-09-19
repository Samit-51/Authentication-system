
const Hotel= ({Name, Id, Qr})=> {
  return(
      <div className= "hotelcard">
        <div className="img"></div>
        <div className= "info">
          <span>{HotelName}</span><br/>
          <span>{HotelId}</span>
        </div>
      </div>
  );
}

export default Hotel;