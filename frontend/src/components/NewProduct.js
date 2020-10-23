import React, { useEffect, useState} from 'react';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import {  listProducts, deleteProduct, deleteCategory } from '../Redux/store';
import axios from 'axios';
import isEmpty from 'validator/lib/isEmpty';
import { showErrormsg, showLoadingMsg, showSuccessmsg } from './messages';
import { Link } from 'react-router-dom';
import { createProduct } from './CreateProduct';
import CreateDeals from './createDeals';

  const CreateProduct = (props) => {

    
    const [categories, setCategories] = useState(null);
    const productsList = useSelector(state => state.productsList);
    const { products} = productsList;
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loadings, setLoadings] = useState('');
     
    const [productData, setProductData] = useState({
        name: '',
        file: '',
        description: '',
        price: '',
        id: '',
        countInStock: '',
        productCategory: ''
       
       
    });
    const{ name, file, price, countInStock, description, id, productCategory} = productData;


    
    
     const dispatch = useDispatch();

     useEffect(() => {
       
         
         dispatch(listProducts());

         loadCategories();

        
        


       return () => {
         //
       }
     }, [loadings]);

     const submitHandler = (e) => {
         e.preventDefault();

         if(file === null) {
             setErrorMsg('Please select an image');
         } else if(isEmpty(name) || 
                  isEmpty(price) ||
                  isEmpty(description) || 
                  isEmpty(countInStock) || 
                  isEmpty(productCategory)) {
             setErrorMsg('All fields are required');
         } else {
             let formData = new FormData();
             formData.append('file', file);
             formData.append('name', name);
             formData.append('price', price);
             formData.append('description', description);
             formData.append('countInStock', countInStock);
             formData.append('productCategory', productCategory);

             createProduct(formData).then( response => {
                   setSuccessMsg(
                    response.data.successMessage
                       );
                       window.location.reload();
             }).catch(err => {
                 setErrorMsg(
                      err.response.data.error
                 );
             });
         }

        
     }
   

     const deleteHandler = (product) => {
         dispatch(deleteProduct(product._id));
         window.location.reload();
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


      

     /********************************************* category ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/
   
    const createCategory = async (data) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    
     
    const response = await axios.post('/api/products/categories', data, config);
    return response;
}

  const handleCategoryChange = (e) => {
      setCategory(e.target.value);
      setErrorMsg('');
      setSuccessMsg('');
      

  }
  
  const handlecategorySubmit = (e) => {
      e.preventDefault();
      setLoadings(true);

      if(isEmpty(category)) {
          setErrorMsg('please enter a category');


      } else {
          const data  = {category};
          setLoadings(true);
          createCategory(data)
          .then(response => {
              setLoadings(false);
              setSuccessMsg(response.data.successMessage);
              setCategory('');
             
          }).catch( err => {
              setErrorMsg(err.response.data.err);
              setLoadings(false);
          })

      }
  }

   

   /********************************************* Load Categories ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/

     const getCategories = async () => {
        const response =  await axios.get('/api/products/categories');
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




     /********************************************* Delete Categories ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/


      
      const deleteCategoryHandler = async (cat) => {
         dispatch(deleteCategory(cat._id));
         window.location.reload();
      }

  
  
  
  



 
  
  

 
    
    
  



    
     
   
     /********************************************* Products ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/

         
   const addProducts = () => {
    return ( 
        <>

        <div className = 'container-fluid pt-4'>
          <div className = ' text-white text-center mb-5 ' style = {{height: '100px', background: ' radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}>
           <h1 className = 'mt-2 pt-4'>Admin Dashboard</h1>
           </div>
           <div className = 'text-center'>
           <h2 className = 'text-white' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}>Categories</h2>
           <button type = 'button' className = 'btn mt-3 mb-4' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} data-toggle = 'modal' data-target = '#addcategoryModal'>Create a Caregory</button>
           </div>
           <ul className = 'list-group list-unstyled '>
              {categories && categories.map( response => {
                 
                                
                                return (
                                    <li className = ' list-group-item list-group-item-action h4' key = {response._id}>
                                        <Link to ={ '/categoriesproducts/' + response._id} style = {{color: 'black', textDecoration: 'none'}}>
                                        
                                        {response.category}
                                    
                                        </Link>
                                        <button type = 'button' className = 'btn  float-right mr-2'  onClick = {() => deleteCategoryHandler(response)}> <i className = "fa fa-trash-alt"></i>Delete</button>
                                        <button type = 'button' className = 'btn  float-right '><i className = "fa fa-edit"></i>Edit</button>

                                </li>
                                )
                            })}
          

            </ul>

            <div className = 'py-4'>
            <h1 className = ' text-center text-white' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}>Deals</h1>
                <CreateDeals/>

          </div>


           
           <h3 className = 'text-center font-weight-bold text-white' style = {{ background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}>Products</h3>

        </div>



            <div className = ' modal' id = 'addProductModal'>
            <div className = 'modal-dialog modal-dialog-centered modal-lg'>
            <div className = 'modal-content text-white' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}>
            <form onSubmit = {submitHandler} enctype="multipart/form-data">
            <div className = 'modal-header bg-info'>
                <h3 className = 'modal-title'>Create a Product</h3>
                <button className = 'close' data-dismiss = 'modal'>
                    <i className = 'fas fa-times'></i>
                </button>
                </div>
                {errorMsg && showErrormsg(errorMsg)}
                {successMsg && showSuccessmsg(successMsg)}
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
                    <label htmlFor = 'price' className = 'font-weight-bolder'>Price:</label> <br/>
                    <input type = 'text' id = 'price'  name ='price' value ={price} onChange = {handleProductChange}></input><br/><br/>
                </div>
                <div>
                    <label htmlFor = 'countInStock' className = 'font-weight-bolder'>countInStock:</label> <br/>
                    <input type = 'text' id = 'countInStock' value ={countInStock}  name ='countInStock' onChange = {handleProductChange}></input><br/><br/>
                </div>

                   
              
                <br/>
               
                <div>
                    <label htmlFor = 'description' className = 'font-weight-bolder'>Description:</label> <br/>
                    <textarea value ={description} type = 'text' id = 'description'  name ='description' onChange = { handleProductChange }></textarea><br/><br/>
                </div>
                <div>
                <label>Categories</label> <br/>
                <select name = 'productCategory' className = 'custom-select w-75 mr-sm-2' onChange = {handleProductChange}>
                    <option value = ''>Choose one</option>
                   
                       {
                        categories && categories.map( c => 
                       {
                          return (
                       
                              <option key = {c._id} value = {c._id}>
                                {c.category}
                            </option>
                           
                           )
                        })
                       }
                       </select>
                       
                        
                    
                    

                   
                </div>
                <br/>
                <br/>
                </div>  

                <div className = 'modal-footer text-center'>
                <button type= 'submit' className = 'btn ' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}}> { id? 'Update':'Create'}</button>
                <button type= 'submit' className = 'btn  close' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} data-dismiss = 'modal'>Close</button>
                </div>
              
               
            </form>
        </div>
        </div>
        </div>
        
       
        

        <div className = 'product-list'>
        <div className = 'text-center pb-4'>
           <button type = 'button' className = 'btn' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} data-toggle = 'modal' data-target = '#addProductModal'>Create a Product</button>
           </div>

            
                    <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                                products.map( product => {
                                    return (
                                        <tr key = {product.id}>
                                <th scope="col">{product._id}</th>
                                <th scope="col">{product.name}</th>
                                <th scope="col">{product.price}</th>
                                <th scope="col">{product.category}</th>
                                <th>
                                    <Link to = {'/edit/' + product._id} className = 'btn' style = {{textDecoration: 'none'}}><i className = "fa fa-edit"></i>Edit</Link> &nbsp;
                                    <button onClick = {() => deleteHandler(product)} className = 'btn'><i className = "fa fa-trash-alt"></i>Delete</button>
                                </th>
                                </tr>

                                    )
                                })
                            }
                               
                            </tbody>
                            </table>
        </div>

        
       
        </>
      
    )

   };


   const showcategoryModal = () => {
    return (
    <div id = 'addcategoryModal' className = 'modal'>
        <div className = 'modal-dialog modal-dialog-centered modal-lg'>
            <div className = 'modal-content'>
            <form onSubmit = {handlecategorySubmit}>
              <div className = 'modal-header bg-info'>
                <h3 className = 'modal-title'>Add a category</h3>
                <button className = 'close' data-dismiss = 'modal'>
                    <i className = 'fas fa-times'></i>
                </button>
                </div>
              
                <div className = 'modal-body text-secondary text-center'>
                      { errorMsg && showErrormsg(errorMsg)}
                      {successMsg &&  showSuccessmsg(successMsg)}
                      {loadings &&
                          showLoadingMsg(loadings)}
                      
                      <label className = 'w-100'>Category</label><br/>
                     <input type = 'text' name = 'category' value = {category} onChange = {handleCategoryChange}></input>
                     
                        
                </div>
                <div className = 'modal-footer'>
                    <button className = 'btn close' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} data-dismiss = 'modal'>close</button>
                    <button type = 'submit' className = 'btn' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} >submit</button>
                </div>
               </form>

            </div>
        </div>
    </div>
    )
}
 





  


   return (
       <>
       {addProducts()}
       {showcategoryModal()}

      
       </>
   )
      

  }
    

export default CreateProduct;