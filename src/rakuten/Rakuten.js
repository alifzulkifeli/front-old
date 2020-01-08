import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {R_Search, Item1} from './apiRakuten';

const R_Product = () => {
    if (localStorage.getItem("R_Search") === null) {
        localStorage.setItem('R_Search', JSON.stringify(''));
    }

    
    return (
        <Layout
            title="Shop from Rakuten"
            description="Get item directly from the largest online shop at japan. "
            learnMore="rakuten.com"
            className="container"
            jumbo='jumbotron'
        >
            <R_Search />

            {localStorage.getItem("R_Search").length < 3 ?
                <Item1 name=''/> : null
            }

        </Layout>
    );
};

export default  R_Product;


/* jam 
gregory
duck dude
new era
bodykit car */
