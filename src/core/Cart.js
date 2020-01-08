import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="manage your cart here. "
            learnMore=''
            className="container"
            jumbo='jumbotron'
        >
            <div className="row container">
                <div className="col-lg-6 col-sm-12 mt-5">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-lg-6 col-sm-12">
                    <h2 className="mb-4 mt-5">Your cart summary</h2>
                    <hr />
                    
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
