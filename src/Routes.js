import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import MercariSingleProduct from './mercari/MercariSingleProduct';
import RakutenSingleProduct from './rakuten/RakutenSingleProduct';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import M_Product from './mercari/Mercari';
import R_Product from './rakuten/Rakuten';
import Activate from './auth/Activate';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
import Footer from './core/Footer'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/mercari" exact component={M_Product} />
                <Route path="/rakuten" exact component={R_Product} />
                <Route path="/auth/password/forgot" exact component={Forgot} />
                <Route path="/auth/activate/:token" exact component={Activate} />
                <Route path="/auth/password/reset/:token" exact component={Reset} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/mercari/product" exact component={MercariSingleProduct} />
                <Route path="/rakuten/product" exact component={RakutenSingleProduct} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
            </Switch>
            
        </BrowserRouter>
    );
};

export default Routes;
