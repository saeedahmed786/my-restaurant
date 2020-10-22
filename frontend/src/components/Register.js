import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { Link } from 'react-router-dom';
import '../index.css';
import { showErrormsg, showLoadingMsg, showSuccessmsg } from './messages';
import Axios from 'axios';

export default function Register(props) {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        successmsg: false,
        errormsg: false,
        loading: false
        
    });

    const {
        name,
        email,
        password,
        rePassword,
        successmsg,
        errormsg,
        loading
        
    } = formData;
   
  
   

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            successmsg: '',
            errormsg:''
        });
    };
   
     const signup = async (data) => {
         const config = {
             headers: {
                 "Content-Type": "application/json"
             }
         }
         
         const response = await Axios.post('/api/users/register', data, config);
         return response;
     }

    


    const submitHandler = (e) => {
        e.preventDefault();
       

        if(
            isEmpty(name) ||
            isEmpty(email) ||
            isEmpty(password) ||
            isEmpty(rePassword)
        ) {
            setFormData({
                ...formData,
                errormsg: 'All fields are required',
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errormsg: 'Invalid Email'
            });
        } else if (password.length < 6 ) {
            setFormData({
                ...formData,
                errormsg: 'Password must be atleast 6 characters long'
            });
        }
        
        else if (!equals(password,rePassword)) {
            setFormData({
                ...formData,
                errormsg: 'Password do not match'
            });
        } else {
            const {name, email, password } = formData;
            const data = { name, email, password};
            setFormData({...formData, loading: true})
            signup(data).then( response => {
                setFormData({
                    successmsg: response.data.successMessage,
                    loading: false,
                    
                });
       
            }).catch(err => {
                setFormData({
                    ...formData,
                    errormsg: err.response.data.error,
                    loading: false
                });
                    });
        } 

      
       
    };
   
    const signUpForm = () => {
        return (
            <>
    
 <div className="container-fluid">
    <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>


        <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-7 mx-auto">
                        <h1 className = 'font-weight-bold borde-bottom pb-3'>Create Account</h1><br/>
                            <p className="text-muted mb-4">Welcome to HOLO FOOD! </p>
                            { successmsg && showSuccessmsg(successmsg)}
                            { loading && showLoadingMsg(loading)}
                            { errormsg && showErrormsg(errormsg)}
                            <form onSubmit = {submitHandler}>
                            <div className="form-group mb-3">
                                    <input id="name" name = 'name' value = {name} onChange = { handleChange } type="name" placeholder="Name"  autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <input id="email" name = 'email' value = {email} onChange = { handleChange } type="email" placeholder="Email address"  autofocus="" className=" form-control rounded-pill border-0 shadow-sm px-4"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input id="password" name = 'password' value = {password}  onChange = { handleChange } type="password" placeholder="Password"  className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <input id="rePassword" name = 'rePassword' value = {rePassword} onChange = { handleChange } type="password" placeholder="Re-Enter Password"  className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input id="customCheck1" type="checkbox" checked className="custom-control-input"/>
                                    <label for="customCheck1" className="custom-control-label" onChange = {handleChange}>Remember password</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Register</button>
                                <br/>
                                <p>Always have an account? <br/><Link to = '/signin' className = ' mt-2 btn btn-outline-info text-dark'>Signin</Link></p>
                 
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
        </>
        )
    }

    return (
        <div className = 'signup-form text-center'>
        <h2 className = 'font-weight-bolder text-center pt-5'>HOLO FOOD</h2><br/>
           <div className = 'text-center' style = {{paddingLeft:"480px" ,paddingRight: '480px'}}>
           </div>
            { signUpForm() }


           

        </div>
    )
    
}
