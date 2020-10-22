import React, { useEffect, useState } from 'react';
import '../index.css';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';
import { getCategories } from './Category';
import logo  from '../images/logo.png';

 function Navbar(props) {
   
   
   
    return (

        <>
        
        <nav className="navbar navbar-expand-lg h-25">
                        <Link className="navbar-brand pl-3" to="/" style = {{color: 'white'}}><img src = {logo} style = {{width: '100px'}}/>HOLO FOOD</Link>
                        <button className="navbar-toggler text-light" style = {{color: 'white'}} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="fas fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNav" style = {{color: 'white'}}>
                    <ul className="navbar-nav mr-auto text-center pt-3 text-light" style = {{fontSize: '15px', paddingLeft: '60px', textDecoration: 'none'}}>
                            <li className="nav-item active">
                        <Link className="nav-link" to="/"><i class="fas fa-home"></i><br/>Home</Link>
                    </li>
                   

                    <li className="nav-item pl-3">
                        <Link className=" nav-link" to = '/categoriesproducts'>
                        <i class="fas fa-store-alt"></i><br/>Categories
                        </Link>
                        
                        </li>

                        <li className="nav-item pl-3">
                        <Link className="nav-link" to="/cart/:id"><i class="fas fa-shopping-cart"></i><br/>Cart</Link>
                    </li>
                   
                 
                    
                    <li className="nav-item pl-3">
                        <Link className="nav-link" to="#"><i class="fas fa-address-card"></i><br/>About</Link>
                    </li>
                    <li className="nav-item pl-3">
                        <Link className="nav-link" to="#"><i class="fas fa-phone"></i><br/>Contact</Link>
                    </li>
                    

                   

                    {
                        isAuthenticated() && isAuthenticated().role === 1 && (
                            <>
                       
                    <li className="nav-item pl-3">
                        <Link className="nav-link" to="/products"><i class="fas fa-user-shield"></i><br/>Admin Panel</Link>
                    </li>
                    
                    
                   

                            </>
                        )
                    }

                    {
                        !isAuthenticated() && (
                            <li className="nav-item pl-3">
                             <Link className="nav-link ml-3" style = {{color: 'lightgrey'}} to="/signin"><i className="fas fa-sign-in-alt"></i><br/>Login
                             </Link>
                      
                       
                         </li>

                        )
                    }
                    {
                        isAuthenticated() || isAuthenticated().role === 1 ? (
                            <li className="nav-item candidname">
                             <Link className="" to="/profile" style = {{color: 'lightgrey'}}>
                             <i class="fas fa-user-tie"></i><br/>{ isAuthenticated().name}
                             </Link> 
                            </li>
                             )

                             : null
                      
                       
                    

                       
                    }

                    {
                        isAuthenticated() && (
                            
                            <li className="nav-item pt-2" style = {{}}>
                               <Link className=" ml-3 logout"  onClick = {
                                    (e) => {
                                        logout(() => {
                                        props.history.push('/signin');
                                    })
                                    
                              }}> <i className="fas fa-sign-in-alt"><br/>Logout</i></Link>
                            </li>

                        )
                    }

                         </ul>
                        </div>
                        </nav>
       

                
        </>
    )
}

export default withRouter(Navbar);