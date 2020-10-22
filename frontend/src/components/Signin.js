import React, {  useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { showErrormsg, showLoadingMsg, showSuccessmsg } from './messages';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import Axios from 'axios';
import { isAuthenticated, setAuthentication } from './auth';

export default function Signin(props) {
      
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        successmsg: false,
        errormsg: false,
        loading: false
        
    });

    const {
        email,
        password,
        successmsg,
        errormsg,
        loading
        
    } = formData;

    const login = async (data) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
         
        const response = await Axios.post('/api/users/signin', data, config);
        return response;
    }

    const redirect = props.location.search? props.location.search.split('=')[1]: '/';
   


    

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            successmsg: '',
            errormsg:''
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
       

        if(
            isEmpty(email) ||
            isEmpty(password) 
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
        } else {
            const {email, password } = formData;
            const data = {email, password};
            setFormData({...formData, loading: true})
            login(data).then(response => {
                setAuthentication(response.data.token, response.data.user);
                setFormData({
                    successmsg: response.data.successMessage,
                    loading: false,
                    
                });
                props.history.push('/');
       
            }).catch(err => {
                setFormData({
                    ...formData,
                    errormsg: err.response.data.error,
                    loading: false
                });
                    });
            

        }


    }

    const signinForm = () => {

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
                        <h1 className = 'font-weight-bold borde-bottom pb-3'>HOLO FOOD</h1><br/>
                            <p className="text-muted mb-4">Welcome Back! </p>
                                                    { successmsg && showSuccessmsg(successmsg)}
                                { loading && showLoadingMsg(loading)}
                                { errormsg && showErrormsg(errormsg)}
                            <form onSubmit = {submitHandler}>
                                <div className="form-group mb-3">
                                    <input id="email" name = 'email' onChange = { handleChange } type="email" placeholder="Email address"  autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input id="password" name = 'password'  onChange = { handleChange } type="password" placeholder="Password" required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"/>
                                </div>
                               
                                <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                <br/>
                                <p>New to Holo Food?</p>
                             <Link  to = {redirect === '/' ? 'register' : 'register?redirect=' + redirect} className = 'btn btn-outline-info text-dark'> Create Your New Account</Link>
                 
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>
</>

           
          
           
            
    );
    }

    return (
        <div className = 'signup-form text-center mt-5'>
           <div className = 'text-center' style = {{paddingLeft:"480px" ,paddingRight: '480px'}}>
           </div>
            { signinForm() }


           

        </div>
    );

    }
