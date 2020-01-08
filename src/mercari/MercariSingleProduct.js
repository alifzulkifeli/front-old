import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { mercariProductDetails} from './apiMercari';
import Card from '../core/Card';

const MercariSingleProduct = props => {
 
  
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    mercariProductDetails(props.location.search.substr(1)).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setProduct(data.product);
              setRelatedProduct(data.relatedItems);
              
              
               
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
          <div className="row container">
              <div className="col-lg-7 col-sm-12 col-md-10 mr-lg-5">
                  {product && product.description && <Card product={product} showViewProductButton={false} showDetails={true} />}
              </div>

              <div className="col-lg-4 col-sm-12 col-md-7">
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

export default MercariSingleProduct;
