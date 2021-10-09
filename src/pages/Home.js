
import React, {useState,useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Nav from "../components/Nav";

const Home = () => {
    const [name,setName] = useState("")
    let [isTokenExpired,setExpiry] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        (
            async ()=>{
                const token = localStorage.getItem('token')
                const response = await fetch('http://localhost:8000/api/user',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                const data = await response.json()
                console.log(data)
                if (data.error){
                    setExpiry(true)
                    localStorage.removeItem("token")
                   // alert("Session expired, please login")
                }
                if (data.name){
                    setName(data.name)
                }
            }
        )();
    });
    //
    if (!token || isTokenExpired){
        return <Redirect to="/login"/>
    }

    return (
        <p>
            {name && <h5>Welcome {name} </h5>}
        </p>

    );
};

export default Home;