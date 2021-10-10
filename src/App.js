import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import {BrowserRouter,Route} from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <div className="container">
                    <Route path="/"  exact component={Login} />
                    <Route path="/home" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/edit-employee/:id" component={Edit}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
