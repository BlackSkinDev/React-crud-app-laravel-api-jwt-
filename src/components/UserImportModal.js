import React, {Component} from 'react';
import swal from "sweetalert";
import axios from "axios";

class UserImportModal extends Component {
    state = {
       selectedFile:'',
        BASE_URL:process.env.REACT_APP_BASE_URL,
        token:localStorage.getItem('token'),
        error:''
    }


    handleInput = (e)=>{

        this.setState({
            selectedFile:e.target.files[0]
        });
    }

    handleSubmission = async (e)=> {
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);
        document.getElementById("import").disabled = true;
        document.getElementById("import").innerHTML = 'Importing....'
       // console.log(formData)
        const res = await
            axios.post(`${this.state.BASE_URL}/users`,formData, {headers: {"Authorization": `Bearer ${this.state.token}`}},)
                .then(res => {
                    console.log(res.data + "passed")
                    document.getElementById("import").disabled = false;
                    document.getElementById("import").innerHTML = 'Import'
                    swal({
                        title:'Success',
                        text:res.data.message,
                        icon: "success",
                        button:"Ok!",
                    }).then(function () {
                        window.location.href = "/home";
                    });
                })
                .catch(err => {
                    if(err.response.status===401){
                        this.logoutExpiredSessions()
                    }
                    else{
                        document.getElementById("import").disabled = false;
                        document.getElementById("import").innerHTML = 'Import'
                         // alert(err.response.data.errors[0])
                        swal({
                             title: err.response.data.errors,
                             text: "Errors encountered while importing employees!",
                             icon: "error",
                         });
                    }
                });
    }

    logoutExpiredSessions = async (e)=>{
        localStorage.removeItem("token")
        swal({
            title:'Oops! Seems your session has expired',
            text:'You are being redirected to login page!',
            icon: "success",
            button:"Ok!",
        }).then(function () {
            window.location.href = "/login";
        });
    }



    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal"
                        data-target="#exampleModal">
                    Import New Employees
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Import Employees</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                {this.state.error}
                                <div className="form-group mb-3">
                                    <label>File Type</label>
                                    <label className="makeshift">***.xlsx***  </label>
                                    <input type="file" name="file"  className="form-control" onChange={this.handleInput}  />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal" id="close">Close
                                </button>
                                <button type="button" id="import" className="btn btn-primary" onClick={this.handleSubmission} >Import</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserImportModal;