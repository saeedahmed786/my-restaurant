import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';

export default function PlaceOrder (props) {
   
    const cart = useSelector( state => state.cart);
    const { cartItems , shipping, payment} = cart;

    

    if(!shipping) {
        props.history.push('/shipping');
    }
     
    if(!payment) {
        props.history.push('/payment');
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 10 : 0;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice =  itemsPrice + shippingPrice + taxPrice;





     const placeOrderHandler = () => {
         // create an order
     }
   

    useEffect(() => {
        
       
        return () => {
            
        }
    }, [])

   


  
            return  (
                    <div>
                    <div className = ' container'>
                    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
                   <div className = 'row'>
                     <div className = 'col-lg-9'>
               
                
                    <div className = 'border border-dark w-75 px-2 py-2 mb-3' style = {{marginRight: '380px'}} >
                        <h3 className = 'placeOrder-title'>Shipping Address </h3>
                       
                    
                  
                        <div>
                        {cart.shipping.address}, { cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country}
                    </div>
                    
                                    
                    </div>

                    <div className = 'border border-dark mt-4 pl-3 py-4 w-75' style = {{marginRight: '380px'}}>
                        <h3 className = 'pt-4'>Payment</h3>
                        <div>
                            Payment Method: {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div className = ''>

                    <div className = ' border border-dark pb-2 mt-2'>
                    
                    {
                        cartItems.length === 0 ? 
                        <div>
                            Cart is Empty
                        </div>
                        :
                        cartItems.map( item => {
                            console.log(item);
                            return (
                                <div className = ' placeOrder-item' key = {item.id}>
                                   <div className = 'media pt-5'>
                                       <img src = {'http://localhost:5000/' + item.image} alt = { item.name } style= {{ width: '159px', height: '140px',}} className = 'img-fluid img-responsive pl-4 order-image'></img>      
                                         <div className = 'media-body ml-5'>
                                           <Link to = { '/cart/' + item.product }> { item.name }</Link>
                                             <div className = 'font-weight-bolder'>
                                                    Qty: {item.qty}
                                                   
                                              </div>
                                              <p className = 'font-weight-bolder' >
                                                 Price: ${item.price}
                                              </p>
                                         </div>                             
                                    </div>

                                    </div>
                                
                                    
                                )

                                   })

                    }
                    </div>

                    </div>
                    </div>
                   
                        
 
                                <div className = ' col-md-12 col-lg-3 bg-white pt-1 order-color border border-dark h-50 text-center mt-3'>
                                      <div>
                                          <h2>Order Summary:</h2>
                                      </div>
                                      <div>
                                          <p>Shipping:</p>
                                          <p>${shippingPrice}</p>
                                      </div>
                                      <div>
                                          <p>Tax:</p>
                                          <p> {taxPrice}</p>
                                      </div>
                                      <div>
                                          <p>Order Total:</p>
                                          <p> {totalPrice}</p>
                                      </div>

                                     
                                      <h5>
                                         Total ({cartItems.reduce(( a, b) => a + b.qty, 0)} items) : 
                                         $ ({cartItems.reduce(( a,b ) => a + b.qty*b.price.toString(),0)})
                                        </h5>

                                        <div>
                                          <button className = 'btn w-100 mb-2' style = {{background: 'radial-gradient( circle at top right, #16222A, #3A6073)', color: 'lightgray'}} onClick = {placeOrderHandler}>Place An Order</button>
                                      </div>
                                      
                                   

                                </div>

                              


                   
                            
                        
                    

                    
               
                    
                </div>
                </div>
               </div>
            )
               
            
            
}
