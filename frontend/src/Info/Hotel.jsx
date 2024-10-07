const Hotel= ({Name, Id, Qr})=> {
  return(
      <div className= "hotelCard">
        <button className="remove-btn">
          <i className="fa-solid fa-trash"></i>
        </button>
        <div className="img"></div>
        <div className= "info">
          <span className="Hotelname">{ Name }</span><br/>
          <span>{ Id }</span>
        </div>
      </div>
  );
}

export default Hotel;