import React, {useState} from 'react';
import {Redirect} from "react-router-dom";

const Login = () => {



    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState(null)
    let [state,setState] = useState(false)


    const token = localStorage.getItem('token')
    if (token && !state){
        return <Redirect to="/home"/>
    }


    const login =  async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        if (data.errors){
            setErrors(data.errors)
            setPassword("")

        }
        if (data.token){
            localStorage.setItem('token', data.token)
            state =true
        }
        if (state){
            window.location.reload(false);
            return <Redirect to="/home"/>
        }

     }


    return (
        <main className="form-signin">
            <form onSubmit={login}>
                { errors &&
                <div className="alert alert-danger">
                    {errors}
                </div> }
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="email" className="form-control"  placeholder="name@example.com" onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-4">
                    <input type="password" className="form-control" value={password} placeholder="Password"  onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <label htmlFor="floatingPassword">Password</label>

                </div>
                <button className="w-100 btn btn-lg btn-dark mt-2" type="submit">Sign in</button>
            </form>
        </main>
    );
};

export default Login;