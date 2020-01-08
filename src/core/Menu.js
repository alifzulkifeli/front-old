import React, { Fragment , useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import '../styles.css'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#145ddb" };
    }
};


const Menu = ({ history }) => (
<nav class="navbar navbar-expand-sm navbar-light bg-light container">
    <nav className='mr-4'>
         <Link
                   
                    to="/"
                >
                   <img className='menu-logo' src="https://res.cloudinary.com/drzyjnnsq/image/upload/v1576586915/web/logo_2_ol88mf.jpg" alt=""/>
                </Link>
      
           
      
    </nav>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>


  <div class="collapse navbar-collapse navbar-height pt-1 pb-1" id="navbarText">
    <ul class="navbar-nav mr-auto">
     
    <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
      
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/mercari")}
                    to="/mercari"
                >
                    Mercari
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/rakuten")}
                    to="/rakuten"
                >
                    Rakuten
                </Link>
            </li>

         

           

         

            

    </ul>
   
                <Link
                    className='mr-4 mb-1'
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                
                <i className="fa fa-shopping-cart fa-2x"></i>{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
          
    {!isAuthenticated() && (
                <Fragment>    
                        <Link
                          
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            <button className="btn btn-sm btn-outline-success mr-3" type="button">Sign in</button>
                        </Link>
                        <Link
                        
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                             <button className="btn btn-sm btn-outline-success mr-5" type="button">Sign up</button>
                        </Link>
                    
                </Fragment>
            )}
 
 {isAuthenticated() && (
        <div className="dropdown show mr-5">
            <a class="btn btn-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            hello, {isAuthenticated().user.name}
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" href="#">

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
              
                    <Link
                     
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >Dashboard
                </Link>
          
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
             
                    <Link
                       
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                     Dashboard
                    </Link>
             
            )}

                </a>
                <a className="dropdown-item" href="#">

            {isAuthenticated() && (
        
                    <span
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                         Sign out
                    </span>
              
            )}

                </a>
            </div>
        </div>
         )}     

            
     

   
  </div>
</nav>

   
    //     <ul className=" bg-primary">
          
               
           

 
    
  
);

export default withRouter(Menu);
