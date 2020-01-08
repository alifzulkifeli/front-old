import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import ShowImageSingleProduct from './ShowImageSingleProduct';
import ShowDetails from './ShowDetails'
import moment from 'moment';
import { addItem, updateItem, removeItem, itemTotal } from './cartHelpers';
import ScrollToTop from 'react-scroll-up';

const Card = ({
  product,
  toTop=false,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showDetails = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const saveToLocal = () => {
    localStorage.setItem('R_Product', JSON.stringify(product));
  }
  
  const showViewButton = showViewProductButton => {
    if (product._id) {
      return (
        showViewProductButton && (
          <Link to={`/product/${product._id}`} className="mr-2">
            <button  className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
          </Link>
        )
      );
    }
    if(product.source=='rakuten'){
      
      return(
      showViewProductButton && (
        <Link to={`/rakuten/product?${product.link}`} className="mr-2">
          <button onClick={saveToLocal} className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        </Link>
       )
      )
    }
    return (
      showViewProductButton && (
        <Link to={`/mercari/product?${product.link}`} className="mr-2">
        <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
      </Link>
     
        // <Link to={{pathname:product.link}} className="mr-2">
        //   <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
        // </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };


  console.log(product);
  
  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={() => {
          addToCart(); // run useEffect in parent Cart
        }} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    if (product._id) {
      return quantity > 0 ? (
        <span className="badge badge-primary badge-pill">In Stock </span>
      ) : (
        <span className="badge badge-primary badge-pill">Out of Stock </span>
      );
    }
    
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    if (product._id) {
      return (
        cartUpdate && (
          <div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Adjust Quantity</span>
              </div>
              <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            </div>
          </div>
        )
      );
    }else{
      return(
        cartUpdate && (
          <p>you cannot edit product quantity, learn here</p>
        )
        
      )
    }
    
  };

  const showImages = imagesss => {
    if (imagesss) {
      if (product.image) {
        if (product.image[1]) {
          product.image2 = product.image[1].imageUrl.slice(0,-12)
        }
        if (product.image[2]) {
          product.image3 = product.image[2].imageUrl.slice(0,-12)
        }
    }
      const clone = JSON.parse(JSON.stringify(product));
      delete clone.name;
      delete clone.price;
      delete clone.description;
      delete clone.source;
      delete clone.image;
      delete clone.status;
      delete clone.link;
      return(
      <ShowImageSingleProduct item={clone} name={product.name}/>)
    }else{
      return(
    <ShowImage item={product}/>)
  }
  }

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product.name);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };


  const showDetail = showDetails => {
    return (
      showDetails && (
        <ShowDetails item={product.description}/>
        
      )
    );
  };

  const showCategory = () => {
    if (product._id) {
      return (
        <div><p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
        </div>
        
      );
    }
  }

  
  return (
    <div className="card mt-5 border border-primary" >
      <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body" >
        {shouldRedirect(redirect)}
        
        {showImages(showDetails)}
        {/* <p className="card-p  mt-2">{product.description.substring(0, 100)} </p> */}
        <p className="card-p black-10">RM {product.price}</p>
        {showCategory()}
        
        
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showDetail(showDetails)}
        
        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}

      </div>
    </div>
  );
};

export default Card;



