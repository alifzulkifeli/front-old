import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus ,updateTrackingNumber} from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [tracking, setTracking] = useState("");

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
                console.log(data);
                
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
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

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    const showTracking = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Tracking: {o.trackingNumber || ""}</h3>
            <form>
            <div className="form-group">
                <input
                    type="text"
                    onChange={e => {
                        e.preventDefault();
                        setTracking(e.target.value)}}
                    className="form-control"
                   
                />
            </div>
            <button onClick={e=>{e.preventDefault();
                submitTracking(o._id)}} className="btn btn-primary">
            Submit
            </button>
        </form>
        </div>
    );

    const submitTracking = ( orderId) => {
        console.log(tracking);
        updateTrackingNumber(user._id, token, orderId, tracking, user.email, user.name).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };
    const addresss = (adr) => {
        
        
       
        return(
          <li className="list-group-item">
            Delivery address: <br/> {adr.address.name} <br/> {adr.address.line1}<br/> {adr.address.line2}<br/> {adr.address.city}<br/> {adr.address.poscode}<br/> {adr.address.state}
          </li>
        )

    }

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            } `}
            className="container"
            jumbo='jumbotron'
            learnMore=''
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    {orders.slice(0).reverse().map((o, oIndex) => {
                        console.log(o);
                        
                        return (
                            <div
                                className="ordertop"
                                key={oIndex}
                                style={{ border: "2px solid indigo" }}
                                
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: {o._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        {showTracking(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    
                                    {addresss(o)}
                                   
                                  
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                        {showInput("Product Link", p.link || 'Local Shop Item')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
