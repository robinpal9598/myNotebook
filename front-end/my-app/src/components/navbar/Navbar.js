import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Profile from '../profile/Profile';
function Navbar() {
    let navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/login');
    }
    let auth = localStorage.getItem('token');
    let name=localStorage.getItem('name');
    console.log(name);
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Safe Notes</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  {auth?
                        <div className="navbar-nav">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/about">About</Link>
                            <Link className={`nav-link`}  to="/profile">Profile</Link>
                            <Link className={`nav-link`}  to='/login' onClick={logout} >logout</Link>
                        </div>:
                        <>
                        <Link className={`nav-link mx-2`} to="/login"> Login</Link>
                        <Link className={`nav-link mx-2`} to="/signUp"> Signup</Link></>
                    }
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}

export default Navbar