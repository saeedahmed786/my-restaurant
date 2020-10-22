import React, { useEffect, useState} from 'react';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsProducts } from '../Redux/store';
import Axios from 'axios';

  const Deal = (props) => {
     const dealId = props.match.params.id

     const [ qty, setQty] = useState(1);
     const dispatch = useDispatch();
     const [deal, setDeal] = useState('');
     useEffect(() => {
         getDeal(dealId)
       return () => {
         
       }
     }, [])
     
     const handleAddToCart = () => {
       props.history.push('/cart/' + props.match.params.id + '?qty=' + qty)
     }

     const getDeal = async (dealId) => {
         console.log(dealId);
         const response = await Axios.get('/api/products/deal/' + dealId);
         setDeal(response.data.deal);
         return response;
             }
  
         
   
        return ( 
            <>         
           <div className = 'pl-3 mt-5'>
             <h1 className = 'text-center mb-5'>
                 Amazing Deal with special Discount
             </h1>
        
           <div className = 'row'>
           <div className = 'col-md-6 col-lg-6 pl-2'>
           <img src = {'http://localhost:5000/' + deal.image} alt = {deal.name} style = {{ width: '100%', height: '500px'}}></img>

                </div>

                   <div className = 'col-md-6 col-lg-6 pl-5 pb-4' style = {{paddingTop: '80px'}}>
                     <h3>{deal.name}</h3>
                     <h5>{deal.description}</h5>
                     <h6>
                     <br/>
                     
                    <span> <del>${deal.priceBefore} </del> </span>  &nbsp; <span>{deal.off}% Off</span>
                               
                    </h6>
                     <h6 className = 'pb-4'  style = {{borderBottom: '1px solid black'}}>
                     
                              ${deal.price}
                                        
                     </h6>
                     <p>Qty: &nbsp;
                    <select value = {qty} onChange = { (e) => { setQty(e.target.value)}} className = 'mt-5'>
                    { [ ...Array(deal.countInStock).keys()].map( x=> 
                     
                     <option value = { x + 1 }> {x + 1}</option>

                    )}
                    
                    </select>
                    </p>
                      { deal.countInStock > 0 && <button className = ' border w-50 btn btn-light btn-lg' onClick ={handleAddToCart} >
                      Add to Cart</button>} <br/> <br/>
                     Share: &nbsp; &nbsp;
                     <i class="fab fa-facebook text-muted"></i>
                     <i class="fab fa-twitter text-muted pl-4"></i>
                     <i class="fab fa-instagram text-muted pl-4"></i>

                   </div>

                  

                  
                 
              
           </div>

            
            
        </div>
        </>
           
            
          
        )

  }
    

export default Deal;