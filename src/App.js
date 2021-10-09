import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Login from "./pages/Login";
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {useEffect, useState} from "react";
import Welcome from "./pages/Welcome";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <div className="container">
                    <Route path="/"  exact component={Welcome} />
                    <Route path="/home" component={()=><Home/>}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
