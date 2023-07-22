import React from 'react'
import { useNavigate } from 'react-router-dom';

function Profile(props) {
  let navigate = useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/login');
}
  return (
    <div>
      <div className="card" style={{"width": "30rem","margin":"auto","margin-top":"120px"}}>
        <div className="card-body" style={{"backgroundColor":"skyblue"}}>
          <div className="profile" style={{"width":"50px","height":"50px","backgroundColor":"lightgreen", "border":"1px solid black","display":"flex","borderRadius":"100px","justifyContent":"center","paddingBottom":"10px"}}><h1>{props.name[0]}</h1></div>
          <h5 className="card-title">{props.name.substring(0,props.name.indexOf("@"))}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.name}</h6>
          <p className="card-text" style={{"cursor":"pointer"}} onClick={logout}>logout</p>
        </div>
      </div>
    </div>
  )
}

export default Profile