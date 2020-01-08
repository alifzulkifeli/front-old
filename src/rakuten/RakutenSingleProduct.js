import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { mercariProductDetails} from '../mercari/apiMercari';
import Card from '../core/Card';

const RakutenSingleProduct = props => {
 
  
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
 

  const loadSingleProduct = () => {
    const clickedProduct = JSON.parse(localStorage.getItem("R_Product"))
    const relatedProduct = JSON.parse(localStorage.getItem("R_List"))
    console.log(relatedProduct);
    
    try {
      setProduct(clickedProduct);
      setRelatedProduct(relatedProduct);
     
      
    } catch (error) {
      setError(error);
    }      
 
  }

  useEffect(() => {
    loadSingleProduct();
}, [props]);

  return (
      <Layout
          title='Product Details'
          description=''
          className="container"
          jumbo='jumbotron'
          learnMore=''
      >
          <div className="row container">
              <div className="col-lg-7 col-sm-12 col-md-10 mr-lg-5">
                  {product && product.description && <Card product={product} showViewProductButton={false} showDetails={true} />}
              </div>

              <div className="col-lg-4 col-sm-5">
                  <h4 className='mt-5'>Related products</h4>
                  {relatedProduct.map((p, i) => (
                      <div className="mb-2" key={i}>  
                      
                          <Card product={p}  /> 
                      </div>
                  ))}
              </div>
          </div>
      </Layout>
  );
};

export default RakutenSingleProduct;
