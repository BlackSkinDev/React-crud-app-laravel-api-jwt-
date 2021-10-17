import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound"
import {useEffect} from "react";
import swal from "sweetalert";


function App() {
    // const token= localStorage.getItem('token');
    // useEffect(()=>{
    //     if (!token){
    //         swal({
    //             title:'Oops',
    //             text:'You are being redirected to login page!',
    //             icon: "success",
    //             button:"Ok!",
    //         }).then(function () {
    //             window.location.href = "/login";
    //         });
    //     }
    // },[])
    return (
        <div className="App">
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route path="/"  exact component={Login} />
                        <Route path="/home" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/edit-employee/:id" component={Edit}/>
                        <Route path='*'  component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
