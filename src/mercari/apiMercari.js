import { API } from "../config";
import React, { useState, useEffect } from "react";
import Card from '../core/Card';



export const M_Search = () => {
    if (localStorage.getItem("M_List") === null) {
        localStorage.setItem('M_List', JSON.stringify([]));
    }
    if (localStorage.getItem("M_Search") === null) {
        localStorage.setItem('M_Search', JSON.stringify(''));
    }

    let seachHistory = localStorage.getItem('M_Search').replace(/['"]+/g, '');
    let seachHistory2 = localStorage.getItem('M_List').replace(/['"]+/g, '');
    
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: seachHistory,
        minPrice: "",
        maxPrice: "",
        results: [],
        lastSearch: seachHistory2,
        searched: false
    });

    const [loading, setLoading] = useState(false)

    const {  category, search, results, searched,minPrice,maxPrice,page } = data;

    

    useEffect(() => {
 
    }, []);

    const list = params => {
    
    localStorage.setItem('M_Search', JSON.stringify(params.search));
    
      return fetch(`${API}/mercari/search?page=${page || 1}&min_price=${Math.trunc(minPrice/0.038)}&max_price=${Math.trunc(maxPrice/0.038)}&search=${search}`, {
          method: "GET"
      })
          .then(response => {      
              return response.json();
          })
          .catch(err => console.log(err));
    };

    
    const searchData = () => {
        setLoading(true)
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        localStorage.setItem('M_List', JSON.stringify(response));
                        setData({ ...data, results: response, searched: true });
                        setLoading(false)
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });    
    };

 

    const searchedProducts = (results = []) => {
        
        return (
            <div>
               

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                            <Card key={i} product={product} cartUpdate={false}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        value={data.search}
                    />
                   
                </div>
                
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text">Search</button>
                </div>
                
            </span>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                   
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("minPrice")}
                        placeholder="minumum price"
                    />
                    <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("maxPrice")}
                        placeholder="maximum price"
                    />
                     <input
                        type="number"
                        className="form-control"
                        onChange={handleChange("page")}
                        placeholder="page number"
                    />
                </div>         
            </span>
            
        </form>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
        let last = JSON.parse(localStorage.getItem('M_List')) 
    return (
        <div className="row">
            <div className="container mb-3 col-lg-8 col-md-10 col-sm-12">{searchForm()}</div>
            <div className="container mb-3">
                {showLoading()}
                {searched ?  searchedProducts(results) : searchedProducts(last)}      
            </div>
        </div>
    );
};



export const Item1 = ({name}) => {
    const [data, setData] = useState({
        results: [],
    });
    const {  results} = data;
    useEffect(() => {   
        searchData()
    }, []);

    const list = () => {
      return fetch(`${API}/mercari/search?search=${name}`, {
          method: "GET"
      })
          .then(response => {
              return response.json();
          })
          .catch(err => console.log(err));
    };

    
    const searchData = () => {
    
            list().then(
                res => {
                    if (res.error) {
                        console.log(res.error);
                    } else {
                        setData({ ...data, results: res});       
                    }
                }
            );
            
            
        
    };
    const searchedProducts = (results = []) => {  
       
            return(
            <div className='justify-content-center'> <h4 className="">{name}</h4>
                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
                            <Card key={i} product={product} cartUpdate={false}/>
                        </div>
                    ))}
                </div>
            </div>
        );
       
        
    };
    return (
        <div className="row container">
           
            <div className=" mb-3">
                {searchedProducts(results)}             
            </div>
        </div>
    );
};

export const mercariProductDetails = productLink =>{
    return fetch(`${API}/mercari/product?uri=${productLink}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}