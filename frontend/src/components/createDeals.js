import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import isEmpty from 'validator/lib/isEmpty';
import { showErrormsg, showLoadingMsg } from './messages';

 const CreateDeals = () => {


      /********************************************* Create Deals ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/
       const createDeal = async (data) => {
           const response = await Axios.post('/api/products/deals', data);
           return response;
       }



    const [deals, setDeals] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loadings, setLoadings] = useState('');
    const [productData, setProductData] = useState({
        name: '',
        file: '',
        description: '',
        priceBefore: '',
        price: '',
        off: '',
        id: '',
        countInStock: '',
       
       
    });
    const{ name, file, priceBefore, price, off, countInStock, description, id} = productData;

    useEffect(() => {
        getDeals();
        return () => {
            
        }
    }, [])



    const submitHandler = (e) => {
        e.preventDefault();

        if(file === null) {
            setErrorMsg('Please select an image');
        } else if(isEmpty(name) || 
                 isEmpty(priceBefore) ||
                 isEmpty(price) ||
                 isEmpty(description) || 
                 isEmpty(countInStock)) {
            setErrorMsg('All fields are required');
        } else {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('priceBefore', priceBefore);
            formData.append('price', price);
            formData.append('off', off);
            formData.append('description', description);
            formData.append('countInStock', countInStock);

            setLoadings(true);

            createDeal(formData).then( response => {
                console.log(response);
                setLoadings(false);
                window.location.reload();
                
                //   setSuccessMsg(
                //    response.data.successMessage
                //       );
                //       window.location.reload();
            })
        }
       
    }

    const handleImageChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name] : e.target.files[0]
        })
    }

    const handleProductChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name] : e.target.value
        })
    }

     /********************************************* Load Categories ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/

    
      
     /********************************************* Load Deals ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/

    const getDeals = async () => {
        const fetchDeals = await Axios.get('/api/products/deals');
        setDeals(fetchDeals.data.deals);
                return fetchDeals;
    }

    const deleteDealHandler = async (delId) => {
        const response = await Axios.delete('/api/products/deals/' + delId);
        window.location.reload();
        return response;
        
 
     }
 



    return (
       
        <div>
         <div className = 'text-center'>
           <button type = 'button' className = 'btn' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} data-toggle = 'modal' data-target = '#addDealModal'>Create a Deal</button>
           </div>
           <ul className = 'list-group list-unstyled '>
              {deals && deals.map( response => {
                 
                                
                                return (
                                    <li className = ' list-group-item list-group-item-action h4' key = {response._id}>
                                        <h4 style = {{color: 'black', textDecoration: 'none'}}>
                                        
                                        {response.name}
                                    
                                        </h4>
                                        <button type = 'button' className = 'btn  float-right mr-2' onClick = {() => deleteDealHandler(response._id)}><i className = "fa fa-trash-alt"></i>Delete</button>
                                        <button type = 'button' className = 'btn  float-right mr-2'><i className = "fa fa-edit"></i>Edit</button>

                                </li>
                                )
                            })}
          

            </ul>

        
         <div className = ' modal' id = 'addDealModal'>
            <div className = 'modal-dialog modal-dialog-centered modal-lg'>
            <div className = 'modal-content bg-dark text-white'>
            <form onSubmit = {submitHandler} enctype="multipart/form-data">
            <div className = 'modal-header bg-info'>
                <h3 className = 'modal-title'>Create a Deal</h3>
                <button className = 'close' data-dismiss = 'modal'>
                    <i className = 'fas fa-times'></i>
                </button>
                </div>
                {loadings && showLoadingMsg(loadings)}
                {errorMsg && showErrormsg(errorMsg)}
                 <div className = 'modal-body text-center mt-3'> 
                    <div className="form-group">
                    <label for="image">Image</label><br/>
                    <input type="file" className="form-control-file" name = 'file' className = 'w-50' id="image" onChange = {handleImageChange}/>
                </div>
                <div>
                    <label htmlFor = 'name' className = 'font-weight-bolder'>Name:</label> <br/>
                    <input type = 'text' id = 'name'  name ='name' value ={name} onChange = {handleProductChange}></input><br/>
                </div>
                
                <br/>

              
              
               <br/>
                <div>
                    <label htmlFor = 'priceBefore' className = 'font-weight-bolder'>Price Before:</label> <br/>
                    <input type = 'text' id = 'priceBefore'  name ='priceBefore' value ={priceBefore} onChange = {handleProductChange}></input><br/><br/>
                </div>
                <div>
                    <label htmlFor = 'price' className = 'font-weight-bolder'>Price Now:</label> <br/>
                    <input type = 'text' id = 'price'  name ='price' value ={price} onChange = {handleProductChange}></input><br/><br/>
                </div>
                <div>
                    <label htmlFor = 'off' className = 'font-weight-bolder'>Off (in %):</label> <br/>
                    <input type = 'text' id = 'off'  name ='off' value ={off} onChange = {handleProductChange}></input><br/><br/>
                </div>
                <div>
                    <label htmlFor = 'countInStock' className = 'font-weight-bolder'>Count In Stock:</label> <br/>
                    <input type = 'text' id = 'countInStock' value ={countInStock}  name ='countInStock' onChange = {handleProductChange}></input><br/><br/>
                </div>

                   
              
                <br/>
               
                <div>
                    <label htmlFor = 'description' className = 'font-weight-bolder'>Description:</label> <br/>
                    <textarea value ={description} type = 'text' id = 'description'  name ='description' onChange = { handleProductChange }></textarea><br/><br/>
                </div>
                <div>
               
                       
                        
                    
                    

                   
                </div>
                <br/>
                <br/>
                </div>  

                <div className = 'modal-footer text-center'>
                <button type= 'submit' className = 'btn btn-light'> { id? 'Update':'Create'}</button>
                <button type= 'submit' className = 'btn btn-light close' data-dismiss = 'modal'>Close</button>
                </div>
              
               
            </form>
        </div>
        </div>
        </div>
            
        </div>
    )
}

export default CreateDeals;
