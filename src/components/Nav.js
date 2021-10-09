import React from 'react';
import {Link} from "react-router-dom";
import  {useState} from 'react';

const Nav = ({name}) => {

    const [refresh,setRefresh] = useState(false)

        const logout= async (e) => {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await response.json()
            localStorage.removeItem("token")
            setRefresh(true)
        }

    if(refresh){
        window.location.reload(false);
    }

    const token = localStorage.getItem('token')
    let menu;
        if(!token){
            menu = (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/register" className="nav-link" aria-current="page" href="#">Register</Link>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" aria-current="page" href="#">Login {name}</Link>
                    </li>
                </ul>
                )
        }
        else{
            menu = (
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" aria-current="page">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link" aria-current="page"  onClick={logout}>Logout</Link>
                    </li>
                </ul>
            )

        }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" href="#">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;