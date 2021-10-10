import React, {Component} from 'react';
import axios from "axios";
import swal from "sweetalert";

class Login extends Component {
    state = {
        email:'',
        password:'',
        BASE_URL:process.env.REACT_APP_BASE_URL,
        error_response:'',
    }

    componentDidMount() {
        this.middleware()
    }

     middleware= (e)=>{
        if (localStorage.getItem('token')){
            window.location.href = "/home";
        }
    }


    handleInput = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    login = async (e)=>{
        e.preventDefault()
        document.getElementById("login-button").disabled = true;
        document.getElementById("login-button").innerHTML='Validating credentials....'
        const res = await
            axios.post(`${this.state.BASE_URL}/login`,{email:this.state.email,password:this.state.password}, { headers: {"Authorization" : `Bearer ${this.state.token}`} },)
                .then(res=>{
                    document.getElementById("login-button").disabled = false;
                    document.getElementById("login-button").innerHTML='Sign in'
                    localStorage.setItem('token', res.data.token)
                    window.location.href = "/home";

                })
                .catch(err=>{
                    document.getElementById("password").value=""
                    document.getElementById("login-button").disabled = false;
                    document.getElementById("login-button").innerHTML='Sign in'
                    let errors =  err.response.data.errors.map((item,index)=>{
                        return(
                            <li key={index} className="text-danger">{item}</li>
                        )
                    });
                    this.setState({
                        error_response:errors,
                        password:''
                    })
                    swal({
                        title: "Error!",
                        text: "Failed",
                        icon: "error",
                    });
                    window.scrollTo(0, 0)

                })

    }


    render() {
        return (
            <div>
                <div className="form-wrapper animate__animated animate__fadeInRight">
                    <main className="form-signin">
                        {this.state.error_response }
                        <form onSubmit={this.login}>
                            <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
                            <div className="form-floating mt-4">
                                <input type="email" className="form-control"   name="email" placeholder="name@example.com" onChange={this.handleInput} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mt-4">
                                <input type="password" id="password" className="form-control"  placeholder="Password" name="password" onChange={this.handleInput}/>
                                <label htmlFor="floatingPassword">Password</label>

                            </div>
                            <button className="w-100 btn btn-lg btn-dark mt-2" type="submit" id="login-button">Sign in</button>
                        </form>
                    </main>
                </div>
            </div>
        );
    }
}

export default Login;