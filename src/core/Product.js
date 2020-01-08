import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {

    
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            console.log(data);
            
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                console.log(data);
                
                // fetch related products
                listRelated(data._id).then(data => {
                    console.log(data);
                    
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
        title='Product Details'
        description=''
        className="container"
        jumbo='jumbotron'
        learnMore=''
        >
            <div className="row">
                <div className="col-lg-7 col-sm-12 col-md-10 mr-lg-5">
                    {product && product.description && <Card product={product} showViewProductButton={false} showDetails={true}  />}
                </div>

                <div className="col-lg-4 col-sm-5">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
