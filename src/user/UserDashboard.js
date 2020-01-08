import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
                console.log(data);
                
            }
        });
    };

    useEffect(() => {
        // eslint-disable-next-line
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    
    const purchaseHistory = history => {
     
        
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div style={{ border: "2px solid indigo" }} className='pl-4 pr-4 pt-4'>
                                    <hr />
                                    {showInput("Status",  h.status)}
                                    {showInput("Tracking Number",  h.trackingNumber)}
                                    {showInput("Order Id",  h._id)}
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i} className='mb-5 mt-5'>
                                                 {showInput("Name", p.name)}
                                                 {console.log(p)
                                                 }
                                                <h6>
                                                {showInput("Price(RM)",  p.price)}
                                                <div className="text-center">                                            
                                                    <img className="purchased-image" src={p.image1}  alt=""/>
                                                </div>
                                                
                    
                                                </h6>
                                                <h6> 
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                    <hr />
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!   `}
            className="container"
            jumbo='jumbotron'
            learnMore=''
        >
            <div className="row container">
                <div className="col-lg-3 mt-5 ">{userLinks()}</div>
                <div className="mt-5 col-lg-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
