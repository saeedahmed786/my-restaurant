import React, { useEffect, useState} from 'react';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsProducts } from '../Redux/store';

  const Product = (props) => {

     const [ qty, setQty] = useState(1);
     const productDetails = useSelector(state => state.productDetails);
     const { product, error, loading } = productDetails;
     const dispatch = useDispatch();

     useEffect(() => {
       dispatch(DetailsProducts(props.match.params.id)); 
       return () => {
         
       }
     }, [])
     
     const handleAddToCart = () => {
       props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
     }
  
         
   
        return ( 
          
           loading? <div>loading...</div>: error? <div>{error}</div>:
         
           <div className = 'pl-3 mt-5'>

        
           <div className = 'row'>
           <div className = 'col-md-6 col-lg-6'>
           <img src = {'http://localhost:5000/' + product.image} alt = {product.name} style = {{ width: '100%', height: '500px'}}></img>

                </div>

                   <div className = 'col-md-6 col-lg-6 pl-5 pb-4' style = {{paddingTop: '80px'}}>
                     <h3>{product.name}</h3>
                     <h6 className = 'pb-4'  style = {{borderBottom: '1px solid black'}}>
                     
                              ${product.price}
                                        
                     </h6>
                     <p>Qty: &nbsp;
                    <select value = {qty} onChange = { (e) => { setQty(e.target.value)}} className = 'mt-5'>
                    { [ ...Array(product.countInStock).keys()].map( x=> 
                     
                     <option value = { x + 1 }> {x + 1}</option>

                    )}
                    
                    </select>
                    </p>
                      { product.countInStock > 0 && <button className = ' border w-50 btn btn-lg' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'whitesmoke'}} onClick ={handleAddToCart} >
                      Add to Cart</button>}
                     <p className = 'text-muted pt-2'> Category:  &nbsp;{product.Category}</p>
                     Share: &nbsp; &nbsp;
                     <i class="fab fa-facebook text-muted"></i>
                     <i class="fab fa-twitter text-muted pl-4"></i>
                     <i class="fab fa-instagram text-muted pl-4"></i>

                   </div>

                   <div className = 'col-md-12 col-lg-12 text-center mt-5'>
                       <h3 className = 'pb-5'>Description</h3>
                       <img src = {'http://localhost:5000/' + product.image} alt = {product.name} className = 'w-75 zoom'></img>
                   </div>

                   <div className = 'col-md-12 col-lg-12 justify-text-center px-5'>
                       <p className = 'pt-4 text-muted pb-5'>{product.description}</p>
                   </div>

                  
                 
              
           </div>

            
            
        </div>
           
            
          
        );

  }
    

export default Product;