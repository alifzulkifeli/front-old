import React, { useState, useEffect } from "react";
import { API } from "../config";
import ReactDOM from "react-dom";
import '../styles.css'
import ModalImage from "react-modal-image";

const ShowImageSingleProduct = ({item,name}) => {
 
    const loopImage = (looping) => {
        var result = Object.keys(looping).map(function(key) {
            return [looping[key]];
          });
          
          console.log(result);
        return (
            <div className="row text-center">
            {result.map((e,k) => (
               <div className="col-lg-6 col-md-12 col-sm-12 pt-2 mb-4 mini-image">
                  
 
                <ModalImage
                small={e}
                large={e}
                alt={name}
                className="mini-image"
                hideDownload="true"
                hideZoom="true"
                />
                </div>
                 
                 
            ))}
               
            </div>
           
        )
        
    }
        

   return(
       <div>{loopImage(item)}
       </div>
       
   )
  
    
};

export default ShowImageSingleProduct;





