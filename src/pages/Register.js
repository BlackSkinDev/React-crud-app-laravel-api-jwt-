import React from 'react';
import {useState} from 'react'
import {Redirect} from 'react-router-dom'
const Register = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [redirect,setRedirect] = useState(false)
    const [errors,setErrors] = useState(null)

    const submit =  async (e)=>{
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const data = await response.json()

        if (data.errors){
            setErrors(data.errors)
            setPassword("")
        }
        else {
            alert(data.message)
            setRedirect(true)
        }
  }

    if (redirect){
        return <Redirect to="/login"/>
    }

    return (
        <main className="form-signin ">
            <form onSubmit={submit}>

                { errors &&
                <div className="alert alert-danger">
                    {errors.map(function(error,index){
                        return <li key={index}>{error}</li>;
                    })}
                </div> }
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <div className="form-floating">
                    <input type="text" className="form-control"  placeholder="Azeez Afeez" onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                    <label htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating mt-4">
                    <input type="email" className="form-control"  placeholder="name@example.com" onChange={(e)=>{
                        setEmail(e.target.value)
                    }} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-4">
                    <input type="password" className="form-control"  placeholder="Password" onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    <label htmlFor="floatingPassword">Password</label>

                </div>
                <button className="w-100 btn btn-lg btn-success mt-2" type="submit">Register</button>
            </form>
        </main>
    );
};

export default Register;