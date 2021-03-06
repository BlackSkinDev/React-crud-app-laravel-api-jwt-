import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
import UserImportModal from "../components/UserImportModal";
class Home extends Component {

    constructor(props) {
        super(props)

        // State
        this.state = {
            token:localStorage.getItem('token'),
            employees:[],
            loading:true,
            BASE_URL:process.env.REACT_APP_BASE_URL,
            role:''

        }
        this.middleware()
    }



   async componentDidMount() {
       const res = await
             axios.get(`${this.state.BASE_URL}/users`, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
                 .then(res=>{
                     if (res.status===200){
                        this.setState({
                            employees:res.data.data,
                            loading:false
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
       await this.getUserRole()


   }

    logout = async (e)=>{
        const res = await
            axios.get(`${this.state.BASE_URL}/logout`, { headers: {"Authorization" : `Bearer ${this.state.token}`} },)
                .then(res=>{
                    localStorage.removeItem("token")
                    swal({
                            title:'See you next time',
                            text:'You are now logged out!',
                            icon: "success",
                            button:"Ok!",
                    }).then(function () {
                        window.location.href = "/login";
                    });
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


    getUserRole = async (e)=>{
        axios.get(`${this.state.BASE_URL}/user`, { headers: {"Authorization" : `Bearer ${this.state.token}`} })
            .then(res=>{
                if (res.status===200){
                    this.setState({
                        role:res.data.role,
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




    middleware = async (e)=>{
       if (!this.state.token){
           swal({
               title:'Oops, Seems your session has expired',
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
        var employee_table = '';
        if (this.state.loading ){
            employee_table = <tr><td colSpan="3"><h2>Loading</h2></td></tr>
        }else{
            employee_table =
                this.state.employees.map((item,index)=>{
                    return (
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone_number}</td>
                            <td>{item.next_of_kin}</td>
                            <td>{item.home_address}</td>
                            <td>{item.marital}</td>
                            <td>{item.dob}</td>
                            <td>{item.educational_degree}</td>
                            <td>{item.professional_qualification}</td>
                            <td>
                                <Link to={`edit-employee/${item.id}`} className="btn btn-sm btn-success" >Edit</Link>
                            </td>
                        </tr>
                    );
                })


        }
        return (
            <div>
                <h4>Role: {this.state.role}</h4>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <button className="btn btn-danger btn-sm float-end" onClick={this.logout}>Logout</button>
                               <UserImportModal/>
                            </div>
                            <div className="card-body">
                                <h4>Employees Data</h4>
                                <table className="table  table-striped table-bordered mt-4 table-hover" >
                                    <tr>
                                    <th>S/N</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                     <th>Phone</th>
                                     <th>Next of Kin</th>
                                     <th>Address</th>
                                     <th>Status</th>
                                     <th>DOB</th>
                                     <th>Degree</th>
                                     <th>Qualification</th>
                                     <th>Action</th>
                                    </tr>
                                    <tbody>
                                    {employee_table}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Home;