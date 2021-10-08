import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Nav/>
            <main className="form-signin container">
               <Login/>
            </main>
        </div>
    );
}

export default App;
