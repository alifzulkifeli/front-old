import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {M_Search, Item1} from './apiMercari';

const M_Product = () => {
    if (localStorage.getItem("M_Search") === null) {
        localStorage.setItem('M_Search', JSON.stringify(''));
    }
   
    return (
        <Layout
            title="Shop from Mercari"
            description="Get item directly from the largest preloved site at japan. "
            learnMore="mercari.com"
            className="container"
            jumbo='jumbotron'
        >
            <M_Search />

            {localStorage.getItem("M_Search").length < 3 ?
                <Item1 name=''/> : null
            }
           
            
            
           
        </Layout>
    );
};

export default  M_Product;


/* jam 
gregory
duck dude
new era
bodykit car */
