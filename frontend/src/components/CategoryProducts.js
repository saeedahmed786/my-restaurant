import React, { Component, useEffect, useState } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


 const CategoryProducts = (props) =>  {
    const [successMsg, setSuccessMsg] = useState('');
    const [categories, setCategories] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [products, setProducts] = useState([]);
  

    
  
        const dispatch = useDispatch();

        useEffect(() => {
            loadCategories();
            
           
            return () => {
                
            }
        }, [])
     
  
        const getCategories = async () => {
            const response =  await Axios.get('/api/products/categories');
            return response;
         }
      
      
        const loadCategories = async () => {
           await getCategories()
           .then( response => {
               
               setCategories(response.data.categories);
              
      
           }).catch(err => {
               setErrorMsg(err.response.data.err);
           })
        }  

        const catHandler = async (catId) => {
            const response = await Axios.get('/api/products/categories/filter/' + catId);
            setProducts(response.data);
            return response;
        }

    
      
 
 
    return (
        <>
        <div className = 'container-fluid'>
        <div className = 'row'>
            <div className = 'col-md-3 col-lg-3 border' style = {{  background: 'transparent', background: 'radial-gradient( circle at top right, #16222A, #3A6073)', borderRadius: '0',
  boxShadow:' none',
  border: 'none'}}>

           
      

         {
             categories && categories.map( response => {
                return (
                 <ul key = {response._id}>
                     <Link   onClick = { () =>  catHandler(response._id)} className = 'active' style = {{textDecoration: 'none', color: 'white'}}>                        
                     {response.category}
                     </Link>
                 </ul>
                 )
             })
         }
        
         </div>

        <div className = 'col-md-9 col-lg-9'>
        <div>
        <div className = 'row ml-2'>

         {products.map( product => {
             return(
                <>
                <div className = 'containers col-md-6 col-lg-4 col-sm-12 py-5 pl-3' key = {product._id}>
                <div className = 'card h-100' style = {{width: '85%'}}>
                <img src={'http://localhost:5000/' + product.image} alt="Avatar" className="image"/>
                <div className = 'card-body'>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>{product.rating} Stars</p>
                            </div>
                <div className="overlay">
                    <div className="text">
                    <Link to = {'/product/' + product._id} className = 'btn btn-outline-info text-white active'>Order Now</Link>

                    </div>
                </div>
                </div>
                </div>
                 </>
             )
         })
         }

         </div>
         </div>
        </div>
        </div>
        </div>

        
       


     
     </>
        
         
          
            
    
    )

}

export default CategoryProducts;
