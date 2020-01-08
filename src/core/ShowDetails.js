import React, { useState } from "react";
import { API } from "../config";
import ReactDOM from "react-dom";
import '../styles.css'


const ShowDetails = ({ item}) => {


  const [translateBoolean, setTranslateBoolean] = useState(false)
  const [translated, setTranslated] = useState('')
  let engDesc = '';
  const translate = async(product) => {
    return await fetch(`${API}/translate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ context: product})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
  };
  
  const handleChange = () => {
    setTranslateBoolean(!translateBoolean)
  }
      translate(item).then(
        response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setTranslated(response)
        }
      });

return translateBoolean ? (
  <div>
    <p className="card-p black-10 mt-5">{translated}</p
    ><button className="btn btn-primary"  onClick={handleChange}>return to Japanese</button> 
  </div> 
  ):(
      <div>
        <p className="card-p black-10 mt-5">{item}</p>
        <button className="btn btn-primary" onClick={handleChange}>translate to English</button>
    </div>
    )
    
};

export default ShowDetails;


