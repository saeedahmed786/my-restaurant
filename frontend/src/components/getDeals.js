import React, { useEffect, useState } from 'react';
import './mySass.scss';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function Deals() {
	const [deal, setDeal] = useState([]);

	useEffect(() => {
		getDeals();
		return () => {
			
		}
	}, [])

	const getDeals = async () => {
		const response = await Axios.get('/api/products/deals');
		setDeal(response.data.deals);
		console.log(response.data.deals);
		return response;
	}
    return (
		<>
<section className = ''>
	<div className="px-4 py-4">
		<div className="row">			
			<div className = 'mx-auto'>
				<div className="col-lg-12">				
					<h1 className="display-2 heading-big heading-big-square text-center">Amazing Deals just for you!</h1>	
				</div>
	       </div>
		   <div className = 'col-lg-12 text-center text-white'>
		      <h4>Order your deal of the Choice</h4>

		   </div>
		  

	    
		{
			deal.map( deal => {
			return (
				<>

				

				       <div className=" col-sm-6 col-md-6 col-lg-3 mt-5">

								<div className="card h-100 mb-4">                    
									<div className="card-header">                                
										<h5 className="card-title m-0 p-0 font-weight-bolder text-secondary">{deal.name}</h5>
									</div>
									<div className="card-body text-left">
										<p className="card-text">{
											deal.description
										} </p>
										<span className="font-lead-base font-weight-bold text-muted">{deal.off}% Off</span>
										<div className="promotion-promo">$ {deal.priceBefore}</div>
										<div className="promotion-price">
											<div className="promotion-price-desc">Now</div>
											<div className="promotion-price-text">${deal.price}</div>                                    
										</div>
									</div>
									<div className="card-footer"><Link to = {'/deals/' + deal._id } className="btn text-white" style = {{backgroundColor: ' #3A6073' }}>Order</Link></div>
								</div>
							</div>
						
				</>

				
			)
		})
		}
		</div>
		</div>
        </section>				
							
     
		</>
    )
}
