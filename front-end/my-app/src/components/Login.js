import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // let history=useHistory();
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(`http://localhost:4000/login`, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        console.log(password);
        result = await result.json();
        console.log(result);
        if (result.success) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('name',email)
            navigate('/');
            //redirect
        }
        else {
            alert('ERROR: invalid credentials')
        }

    }
    return (
        <div>

            <form onSubmit={handleSubmit} className='login_container' style={{ "width": "400px", "margin": "auto", "marginTop": "40px" }}>
                <h1>Login User</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Enter your registered email</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password}   autoComplete='true' className="form-control " id="exampleInputPassword1" />
                                       
                    <div id="passHelp" className="form-text">Enter the correct password</div>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
                <div className="link">
                    <Link to={'/signUp'}>new User</Link>
                </div>
            </form>
        </div>
    )
}

export default Login