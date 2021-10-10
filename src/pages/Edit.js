import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class Edit extends Component {

    state = {
        BASE_URL:process.env.REACT_APP_BASE_URL,
        full_name:'',
        email:'',
        phone_number:'',
        token:localStorage.getItem('token'),
        next_of_kin:'',
        home_address:'',
        marital_status:'',
        dob:'',
        educational_degree:'',
        professional_qualification:'',
        error_response:'',
    }

    handleInput = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    async componentDidMount(){
        this.middleware()
        const id = this.props.match.params.id;
        const res = await
            axios.get(`${this.state.BASE_URL}/users/${id}`, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
                .then(res=>{
                    if (res.status===200){
                        this.setState({
                           full_name:res.data.data.fullname,
                           email:res.data.data.email,
                           phone_number:res.data.data.phone_number,
                            next_of_kin:res.data.data.next_of_kin,
                            home_address:res.data.data.home_address,
                            marital_status:res.data.data.marital,
                            dob:res.data.data.dob,
                            educational_degree:res.data.data.educational_degree,
                            professional_qualification:res.data.data.professional_qualification
                        });

                    }
                })
                .catch(err=>{
                    // forbidden
                    if (err.response.status===403){
                        this.logoutExpiredSessions(err.response.data.message)
                    }
                    else{
                        this.logoutExpiredSessions("Oops! Seems your session has expired")
                    }
                })
    }

    updateEmployee = async (e)=>{
        console.log(this.state.dob)
        e.preventDefault()
        document.getElementById("update-button").disabled = true;
        document.getElementById("update-button").innerHTML='Updating....'
        const id = this.props.match.params.id;
        const res = await
            axios.put(`${this.state.BASE_URL}/users/${id}`,this.state, { headers: {"Authorization" : `Bearer ${this.state.token}`} },)
                .then(res=>{
                    document.getElementById("update-button").disabled = false;
                    document.getElementById("update-button").innerHTML='Update Employee'
                    swal({
                        title:'Success',
                        text:res.data.message,
                        icon: "success",
                        button:"Ok!",
                    })
                    this.setState({
                        error_response:[]
                    })

                    window.scrollTo(0, 0)

                })
                .catch(err=>{
                    if(err.response.status===401){
                        this.logoutExpiredSessions("Oops! Seems your session has expired")
                    }
                    else if(err.response.status===403){
                        this.logoutExpiredSessions(err.response.data.message)
                    }
                    else{
                        document.getElementById("update-button").disabled = false;
                        document.getElementById("update-button").innerHTML='Update Employee'
                        let errors =  err.response.data.errors.map((item,index)=>{
                            return(
                                <li key={index} className="text-danger">{item}</li>
                            )
                        });
                        this.setState({
                            error_response:errors
                        })
                        swal({
                            title: "Error!",
                            text: "Errors encountered while updating employee!",
                            icon: "error",
                        });
                        window.scrollTo(0, 0)

                    }
                })

    }

    middleware = async (e)=>{
        if (!this.state.token){
            swal({
                title:'Oops',
                text:'You are being redirected to login page!',
                icon: "success",
                button:"Ok!",
            }).then(function () {
                window.location.href = "/login";
            });
        }
    }

    logoutExpiredSessions = (error)=>{
        localStorage.removeItem("token")
        swal({
            title:error,
            text:'You are being redirected to login page!',
            icon: "error",
            button:"Ok!",
        }).then(function () {
            window.location.href = "/login";
        });
    }



    render() {
        return (
            <div>
                <div className="row mt-4">
                    <div className="col-md-6 ">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Employee</h4>
                                <Link  to='/home' className="btn btn-primary btn-sm float-end">Back</Link>
                            </div>
                            <div className="card-body">
                                {this.state.error_response }
                                <form onSubmit={this.updateEmployee}>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" onChange={this.handleInput} value={this.state.full_name} name="full_name" className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" onChange={this.handleInput} value={this.state.email} name="email" className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone Number</label>
                                        <input type="number" min="0" name="phone_number" onChange={this.handleInput} value={this.state.phone_number} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Next of Kin</label>
                                        <input type="text" min="0" name="next_of_kin" onChange={this.handleInput} value={this.state.next_of_kin} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Home Address</label>
                                        <input type="text" min="0" name="home_address" onChange={this.handleInput} value={this.state.home_address} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Marital Status</label>
                                        <input type="text" min="0" name="marital_status" onChange={this.handleInput} value={this.state.marital_status} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Date of Birth</label>
                                        <label className="makeshift">Current DOB : {this.state.dob} </label>
                                        <input type="date"  id="dob" min="0" name="dob" onChange={this.handleInput}  className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Educational Degree</label>
                                        <input type="text" min="0" name="educational_degree" onChange={this.handleInput} value={this.state.educational_degree} className="form-control"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Professional Qualification</label>
                                        <input type="text" min="0" name="professional_qualification" onChange={this.handleInput} value={this.state.professional_qualification} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" id="update-button" className="btn btn-primary">Update Employee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Edit;