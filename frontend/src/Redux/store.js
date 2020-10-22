 import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
 import thunkMiddleWare from 'redux-thunk';
 import axios from 'axios';
 import Cookie from 'js-cookie';


 const cartItems = Cookie.getJSON('cartItems') || [];
  const initialState = {
      cart: {cartItems},
 };


 //Constants Of Actins and Reducers

 const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
 const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
 const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
 const PRODUCTS_DETAILS_REQUEST = 'PRODUCTS_DETAILS_REQUEST';
 const PRODUCTS_DETAILS_SUCCESS = 'PRODUCTS_DETAILS_SUCCESS';
 const PRODUCTS_DETAILS_FAIL = 'PRODUCTS_DETAILS_FAIL';
 const CART_ADD_ITEM = 'CART_ADD_ITEM';
 const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
 const PRODUCTS_SAVE_REQUEST = 'PRODUCTS_SAVE_REQUEST';
 const PRODUCTS_SAVE_SUCCESS = 'PRODUCTS_SAVE_SUCCESS';
 const PRODUCTS_SAVE_FAIL = 'PRODUCTS_SAVE_FAIL';
 const PRODUCTS_DELETE_REQUEST = 'PRODUCTS_DELETE_REQUEST';
 const PRODUCTS_DELETE_SUCCESS = 'PRODUCTS_DELETE_SUCCESS';
 const PRODUCTS_DELETE_FAIL = 'PRODUCTS_DELETE_FAIL';
  const CATEGORY_DETAILS_REQUEST = 'CATEGORY_DELETE_REQUEST';
  const CATEGORY_DETAILS_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
  const CATEGORY_DETAILS_FAIL = 'CATEGORY_DELETE_FAIL';
   const CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST';
   const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
   const CATEGORY_DELETE_FAIL = 'CATEGORY_DELETE_FAIL';
   const CART_SAVE_SHIPPING = 'CART_SAVE_SHIPPING';
   const CART_ADD_DEAL = 'CART_ADD_DEAL';
   const CART_REMOVE_DEAL = 'CART_REMOVE_DEAL';
   const CART_SAVE_PAYMENT = 'CART_SAVE_PAYMENT';

 



 //Reducers of products

 const productsListReducer = (state = { products: []}, action) => {
     switch(action.type) {
         case FETCH_PRODUCTS_REQUEST: return {
             loading: true,
             products: []
         };
         case FETCH_PRODUCTS_SUCCESS: return {
             loading: false,
             products: action.payload
         };
         case FETCH_PRODUCTS_FAIL: return {
             loading: false,
             error: action.payload
         };
         default: return state
     }

 }

 const productDetailsReducer = (state = { product: {}}, action) => {
    switch(action.type) {
        case PRODUCTS_DETAILS_REQUEST: return {
            loading: true
        };
        case PRODUCTS_DETAILS_SUCCESS: return {
            loading: false,
            product: action.payload
        };
        case PRODUCTS_DETAILS_FAIL: return {
            loading: false,
            error: action.payload
        };
        default: return state
    }

}


const productDeleteReducer = (state = { product: {}}, action) => {
    switch(action.type) {
        case PRODUCTS_DELETE_REQUEST: return {
            loading: true
        };
        case PRODUCTS_DELETE_SUCCESS: return {
            loading: false,
            product: action.payload,
            success: true
        };
        case PRODUCTS_DELETE_FAIL: return {
            loading: false,
            error: action.payload
        };
        default: return state
    }

}

const categoryDeleteReducer = (state = { cat: {}}, action) => {
    switch(action.type) {
        case CATEGORY_DELETE_REQUEST: return {
            loading: true
        };
        case CATEGORY_DELETE_SUCCESS: return {
            loading: false,
            cat: action.payload,
            success: true
        };
        case CATEGORY_DELETE_FAIL: return {
            loading: false,
            error: action.payload
        };
        default: return state
    }

}




const addToCartReducer = ( state = { cartItems: [], shipping: {}, payment: {}}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM: 
        const item = action.payload;
        const product = state.cartItems.find(x=> x.product ===item.product );
        if(product) {
            return {
                cartItems: state.cartItems.map(x=> x.product ===product.product ? item : x)
            };
        }
        
          return {cartItems: [...state.cartItems, item]};
          case CART_REMOVE_ITEM: 
        
          return {
              cartItems: state.cartItems.filter( x => x.product !== action.payload)
                 };
          case CART_SAVE_SHIPPING: return{
              ...state, 
              shipping: action.payload

          };
          case CART_SAVE_PAYMENT: return{
            ...state, 
            payment: action.payload

        }
          default: return state
    }
   
}




const productSaveReducer = (state = {product: {}}, action) => {
    switch(action.type) {
        case PRODUCTS_SAVE_REQUEST: return {
            loading: true
        };
        case PRODUCTS_SAVE_SUCCESS: return {
            loading: false,
            success: true,
            product: action.payload
        };
        case PRODUCTS_SAVE_FAIL: return {
            loading: false,
            error: action.payload
        };
        default: return state
        
    }
}

const catProductsDetailsReducer = ( state = {categories: []}, action) => {
    switch(action.type) {
        case CATEGORY_DETAILS_REQUEST: return {
            loading: true
        };
        case CATEGORY_DETAILS_SUCCESS: return {
            loading: false,
            categories: action.payload,
            success: true
        };
        case CATEGORY_DETAILS_FAIL: return {
            loading: false,
            error: action.payload
        };
        default: return state
    }

}
 



 //Action Creaters

 export const listProducts = () => async (dispatch) => {
     
     try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST});
         const { data } = await axios.get('/api/products');
         dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data});
         
     } catch (error) {
         dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message});
         
     }
 }



 export const DetailsProducts = (productId) => async (dispatch) => {

    try {

        dispatch({type: PRODUCTS_DETAILS_REQUEST});
        const { data } = await axios.get('/api/products/' + productId);
        dispatch({type: PRODUCTS_DETAILS_SUCCESS , payload: data});
    
        
    } catch (error) {

        dispatch({ type: PRODUCTS_DETAILS_FAIL, payload: error.message});
        
    }
  
}

export const catProducts = (categoryId) => async (dispatch) => {

    try {

        dispatch({type: CATEGORY_DETAILS_REQUEST, payload: categoryId});
        const { data } = await axios.get('/api/products/categories/filter/' + categoryId);
        dispatch({type: CATEGORY_DETAILS_SUCCESS , payload: data});
    
        
    } catch (error) {

        dispatch({ type:CATEGORY_DETAILS_FAIL, payload: error.message});
        
    }
  
}



export const deleteProduct = (productId) => async (dispatch) => {
    try {
       
        dispatch({ type: PRODUCTS_DELETE_REQUEST, payload: productId});

        const { data } = await axios.delete('/api/products/' + productId);
        dispatch({type: PRODUCTS_DELETE_SUCCESS, payload: data});
        
    } catch (error) {
        dispatch({type: PRODUCTS_DELETE_FAIL, payload: error.message});
        
    }
}

export const deleteCategory = (catId) => async (dispatch) => {
    try {
       
        dispatch({ type: CATEGORY_DELETE_REQUEST, payload: catId});

        const { data } = await axios.delete('/api/products/categories/' + catId);
        dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data});
        
    } catch (error) {
        dispatch({type: CATEGORY_DELETE_FAIL, payload: error.message});
        
    }
}




 export const saveProduct = (product) => async (dispatch) => {
           dispatch({type: PRODUCTS_SAVE_REQUEST})
           try{
   
            const { data } = await axios.put('/api/products/'+ product._id, product);

            dispatch({ type: PRODUCTS_SAVE_SUCCESS, payload:  data});
            
        
      
        
     }

    
        

       
        
      catch (error) {
        dispatch({ type: PRODUCTS_SAVE_FAIL, payload: error.message})
        
    }

    }

   

export const AddToCart = (productId, qty) => async (dispatch, getState) => {
        try {
            const { data } = await axios.get('/api/products/' + productId);
            dispatch({
                type: CART_ADD_ITEM, payload: {
                   product: data._id,
                   name: data.name,
                   image: data.image,
                   price: data.price,
                   countInStock: data.countInStock,
                   qty

                }
            });
            const { cart : { cartItems }} = getState();
        Cookie.set( 'cartItems', JSON.stringify( cartItems ));

            
        } catch (error) {
            
        }
}

export const dealAddToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get('/api/products/deal/' + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
               product: data.deal._id,
               name: data.deal.name,
               image: data.deal.image,
               price: data.deal.price,
               countInStock: data.deal.countInStock,
               qty

            }
        });
        const { cart : { cartItems }} = getState();
       Cookie.set( 'cartItems', JSON.stringify( cartItems ));

        
    } catch (error) {
        
    }
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    const { cart : { cartItems }} = getState();
    Cookie.set( 'cartItems', JSON.stringify( cartItems ));
}


export const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data})

}
export const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data})

}





 



 const reducer = combineReducers({
    productsList: productsListReducer,
    productDetails: productDetailsReducer,
    cart: addToCartReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    catProductsDetails: catProductsDetailsReducer,
    
 });

 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunkMiddleWare)));

export default store;
 
