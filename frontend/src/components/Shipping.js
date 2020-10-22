import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import isEmpty from 'validator/lib/isEmpty';
import { saveShipping } from '../Redux/store';
import CheckoutSteps from './CheckoutSteps';
import { showErrormsg, showLoadingMsg } from './messages';

export default function Shipping(props) {

    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(isEmpty(address) || isEmpty(city) || isEmpty(country) || isEmpty(postalCode)) {
            setErrorMsg('All fields are required');

        }
        else {
            setErrorMsg('');
            setLoading(true);
        dispatch(saveShipping({
            address, city, postalCode, country
        }));
        props.history.push('/payment')
    }
    }
     return (
         <>
       

         <div style = {{backgroundColor: 'whitesmoke'}} style = {{width: '100%'}}>
         <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className = 'container-fluid'> 
        <div className = ' text-center'>
          <h1 className = 'py-3 font-weight-bolder'>Shipping</h1>

          <div>
                <div className = 'container text-center w-50 mb-5 signin-form pt-4 pb-4'>
                    {
                            errorMsg && showErrormsg(errorMsg)
                        }
                        {
                            loading && showLoadingMsg(loading) 
                        }
                <form onSubmit = {submitHandler}>
                  
                    <div>
                   
                        <label htmlFor = 'address' className = 'font-weight-bolder'>Address:</label> <br/>
                        <input type = 'text' id = 'address' name ='address'  onChange = {(e) => setAddress(e.target.value) }></input><br/><br/>
                    </div>
                    <div>
                   
                        <label htmlFor = 'city' className = 'font-weight-bolder'>City:</label> <br/>
                        <input type = 'text' id = 'city'  name ='city'  onChange = {(e) => setCity(e.target.value) }></input><br/><br/>
                    </div>

                   

                    <div>
                        <label htmlFor= 'postalCode' className = 'font-weight-bolder'>Postal Code:</label><br/>
                        <input type= 'text' name = 'postalCode'  id= 'postalCode' onChange = { (e) => setPostalCode(e.target.value) }></input>
                    </div> <br/>
                    <div>
                        <label htmlFor= 'Country' className = 'font-weight-bolder'>Country:</label><br/>
                        <input type= 'text' name = 'Country'  id= 'Country' onChange ={ (e) => setCountry(e.target.value) }></input>
                    </div>

                    <br/>
                    <div>
                    <button type= 'submit' className = 'btn w-50' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgrey'}}>Submit</button>
                    </div>
                   
                   
                   
                   
                </form>
                
            
            </div>
          

            
        </div>
        </div>
        </div>
        </div>
        </>
    )
}
