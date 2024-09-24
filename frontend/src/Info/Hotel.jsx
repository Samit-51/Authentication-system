const Hotel= ({Name, Id, Qr})=> {
  return(
      <div className= "hotelcard">
        <div className="img"></div>
        <div className= "info">
          <span>{ Name }</span><br/>
          <span>{ Id }</span>
        </div>
      </div>
  );
}

export default Hotel;