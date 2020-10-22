import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Product from './components/Product';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Signin from './components/Signin';
import AdminRoute from './components/AdminRoute';
import ProductsCreate from './components/NewProduct';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CategoryProducts from './components/CategoryProducts';
import Shipping from './components/Shipping';
import EditProduct from './components/EditProduct';
import Deal from './components/Deal';
import PlaceOrder from './components/PlaceOrder';
import Payment from './components/Payment';



function App() {
  return (

    <>
    <BrowserRouter>
    <div style = {{  background: 'transparent', background: 'linear-gradient(135deg, #172a74, #21a9af)',
     backgroundColor: '#184e8e', borderRadius: '0',
  boxShadow:' none',
  border: 'none'}}>
        <Navbar />
     </div>
   

    <Switch>
    <Route exact path = '/' component = {Home} />
    <Route path = '/product/:id' component = {Product} />
    <Route path = '/edit/:id' component = {EditProduct} />
    <Route path = '/deals/:id' component = {Deal}/>
    <Route path = '/signin' component = {Signin}/>
    <Route path = '/register' component = {Register}/>
    <Route path = '/categoriesproducts' component = {CategoryProducts}/>
    <AdminRoute exact path = '/products' component = {ProductsCreate}/>
    <AdminRoute exact path = '/admin' component = {AdminDashboard}/>
    <Route path = '/cart/:id' component = {Cart} />
    <Route path = '/shipping' component = {Shipping} />
    <Route path = '/payment' component = {Payment}/>
    <Route path = '/placeorder' component = {PlaceOrder} />
    </Switch>
    <Footer/>
    </BrowserRouter>
    

    </>
  
  );
}

export default App;
