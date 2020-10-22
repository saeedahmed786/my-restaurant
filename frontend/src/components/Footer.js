import React from 'react';
import {Link}from 'react-router-dom';
import '../index.css';

export default function Footer() {
    return (
        <div className = 'footer mt-5 text-white'>
           <div className = 'row pt-5 px-5 mb-4'>
               <div className = 'col-md-3 col-lg-3'>
                   <h3 className = 'text-light'>Help and Information</h3> 
                   <div style = {{width: '130px', borderTop: '2px solid white'}}><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Help Center</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Location</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>About Us</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Contact</Link>
                   </div>

               </div>
               <div className = 'col-md-3 col-lg-3 '>
                   <h3 className = 'text-light'>About Us</h3> 
                   <div style = {{width: '40px', borderTop: '2px solid white'}}><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Sitemap</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Privacy</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Help</Link> <br/><br/>
                   </div>

               </div>
               <div className = 'col-md-3 col-lg-3'>
                   <h3 className = 'text-light'>Categories</h3> 
                   <div style = {{width: '130px', borderTop: '2px solid white'}}><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Terms Of Service</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Registry</Link> <br/><br/>
                   <Link to = '/' style = {{textDecoration: 'none'}}>Standard</Link> <br/><br/>
                   </div>

               </div>
               <div className = 'col-md-3 col-lg-3 pt-5'>
                   <h3 className = 'text-light'>HOLO FOOD</h3> 
                     <p>Be the first who learns about our great promotions!</p>
                    <div className = 'text-white'>
                     <h6 className = 'text-white'>Follow Us</h6>
                     <Link to = 'www.facebook.com'>
                         <i className = 'fab fa-facebook fa-lg pt-2 text-white'></i>
                     </Link>  &nbsp; &nbsp; &nbsp; &nbsp;
                     <Link to = 'www.facebook.com'>
                         <i className = 'fab fa-twitter fa-lg text-white'></i>
                     </Link> &nbsp; &nbsp; &nbsp; &nbsp;
                     <Link to = 'www.facebook.com'>
                         <i className = 'fab fa-instagram fa-lg text-white'></i>
                     </Link>
                    
                     </div>

               </div>

           </div>

           <div className = 'text-center text-light pb-4'>
             All rights reserved

           </div>
            
        </div>
    )
}
