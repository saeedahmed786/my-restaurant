import React, { useEffect } from 'react'
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, dealAddToCart,  removeFromCart } from '../Redux/store';
import { isAuthenticated } from './auth';

export default function Cart(props) {

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]): 1;
    const cart = useSelector(state => state.cart);
    const  {cartItems} = cart;
    console.log(cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if(productId) {
            dispatch(AddToCart(productId, qty));
            dispatch(dealAddToCart(productId, qty));
            
        }
        
        return () => {
            
        }
    }, []);
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));

    }
    const checkOutHandler = () => {
        if(isAuthenticated()) {
        props.history.push('/shipping');
    } else {
        props.history.push('/signin');
    }
    }

    
    return (
        <div>
        <div>
           <h2 className = 'text-center my-5'> Cart</h2>
           </div>
           <table class=" container table font-weigth-bold">
                        <thead>
                            <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th>Quantity</th>
                            
                            </tr>
                        </thead>
             
                   {
                     cartItems.length === 0 ? 
                 <div className = 'text-center pt-4'>Products Cart is empty</div>
                 :
                 cartItems.map(cart => {
                     return (
                       <>
                      
                        <tbody>
                            <tr>
                            <th scope="row">{cart.name}</th>
                            <td> ${cart.price}</td>
                            <td>{cart.qty}</td>
                            <button onClick = {() => removeFromCartHandler(cart.product)}  type= 'button' className = 'btn' ><i className="far fa-trash-alt pt-2"></i></button>
                           
                           
                            </tr>
                            </tbody>
                           
                         </>
                        
                     );
                 })
             }
            
             </table> 
             <div className = ' container font-weight-bolder mb-4' style = {{border: '.04rem solid black'}}>
                   <h4 className = 'border-bottom pt-5 pb-5'>Products Cart Totals</h4>
                  
                   <h4 className = 'py-4'>
                   Total 
                   <span className = 'cart-totals' style = {{paddingLeft: '240px'}}>
                     ( {cartItems.reduce(( a, b) => a + b.qty, 0)} items) : 
                    $( { cartItems.reduce(( a,b ) => a + b.qty*b.price.toString(),0)})
                    </span>
                    </h4>
                   {
                       cartItems.length > 0 ? 
                       <button onClick ={checkOutHandler} type = 'button' className = 'btn mb-3 pt-2 ml-4 cart-btn' style = {{width: '300px',height: '60px', color: 'whitesmoke', background: 'radial-gradient( circle at top right, #16222A, #3A6073)'}}>Proceed to Checkout</button>
                       :
                       null
                   }
            </div> 


            
        </div>
    )
}
