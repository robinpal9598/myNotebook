import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate=useNavigate();
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    let register=async(e)=>{
        e.preventDefault();
        let result = await fetch(`http://localhost:4000/register`, {
            method: 'post',
            body: JSON.stringify({email,password,name}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        result = await result.json();
        alert("Congratulation you are registered🎉. Please Login 🙏");
       
        navigate('/login');
    }
  return (
    <div>
         <div>
            <form className='login_container' style={{"width":"400px","margin":"auto" ,"marginTop":"40px"}}>
                <h2>User Registration</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
                    <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" value={name} id="exampleInputEmail2" aria-describedby="username" />
                    <div id="username" className="form-text">Enter your name</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">write your email address</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"  onChange={(e) => { setPassword(e.target.value) }} value={password} className="form-control" autoComplete="on" id="exampleInputPassword1" />
                    <div id="passHelp" className="form-text">Set a strong password</div>
                </div>
                <button  onClick={register} className="btn btn-primary">Register</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp