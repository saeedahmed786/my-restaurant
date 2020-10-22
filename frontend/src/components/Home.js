import React, { useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import background0 from '../images/bg-image.jpg';
import background1 from '../images/header-image.jpg';
import background2 from '../images/cansara.jpg';
import { listProducts } from '../Redux/store';
import '../index.css';
import iphone from '../images/iphone.jpg';
import Navbar from './Navbar';
import Deals from './getDeals';
import { isAuthenticated, logout } from './auth';
 function Home(props) {
    
    const productsList = useSelector(state => state.productsList);
    const { products, error, loading } = productsList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
        return () => {
            
        }
    }, [])
    

  
    return (
        
            loading ? <div>loading...</div> : error? <div>{error}</div> 
            :
            <>
           
    <div>
        <div className="header-blue">

            <div className="container hero text-white">
                <div className="row">
                    <div className="col-lg-5 col-lg-offset-1 col-md-6 col-md-offset-0" style = {{paddingTop: '100px'}}>
                        <h1 className = '  mb-3 mt-5' style = {{fontSize: '30px', display: 'block'}}>The revolution is here.</h1>
                        <p className = 'font-weight-light' style = {{display: 'block'}}>Mauris egestas tellus non ex condimentum, ac ullamcorper sapien dictum. Nam consequat neque quis sapien viverra convallis. In non tempus lorem. </p>
                        <button className=" text-white btn btn-outline-info btn-lg action-button" type="button">Read More</button>
                    </div>
                    <div className="col-lg-5 col-lg-offset-0 col-md-5 col-md-offset-1 d-none d-lg-block d-md-block phone-holder ml-5">
                        <div className="iphone-mockup">
                        <img src={iphone} className="device img-fluid" style = {{ height: '400px', marginTop: '60px', marginLeft: '80px'}}/>
                            <div className="screen"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




   <div className = 'bg-light'>
    <div className = 'container'>
    <Deals/>
    </div>
    </div>
<div>
<div className = 'container pt-5' style = {{backgroundColor: 'whitesmoke'}}>
  <div className = 'row  ml-2'>
     {
         products.map(product => {
             return(
                 <>
             <div className = 'containers col-md-6 col-lg-4 col-xl-3 col-sm-6 py-5' key = {product._id}>
                <div className = 'card' style = {{height: '90%', width: '90%'}}>
                <img src={'http://localhost:5000/' + product.image} alt="Avatar" className="image"/>
                <div className = 'card-body'>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>{product.rating} Stars</p>
                            </div>
                <div className="overlay">
                    <div className="text">
                    <Link to = {'/product/' + product._id} className = 'btn btn-outline-info text-white'>Order Now</Link>

                    </div>
                </div>
                </div>
                </div>
                 </>
         

             );
         })
     }
  </div>
  
  
  
    
</div>
</div>
</>
        
        
        
    )
}


export default Home;
