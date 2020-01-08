import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Search from './Search';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState(false);
    // eslint-disable-next-line
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filter, setFilter] = useState(true);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadFilter = (filter) => {
        return (
            <div style={{ display: filter ? 'none' : '' }}>
            <div className="col-lg-2 col-md-12 col-lg-12 ">
            <h4 className='mt-lg-5 mt-sm-0'>Filter by categories</h4>
            <ul>
                <Checkbox
                    categories={categories}
                    handleFilters={filters =>
                        handleFilters(filters, "category")
                    }
                />
            </ul>

            <h4>Filter by price range</h4>
            <div>
                <RadioBox
                    prices={prices}
                    handleFilters={filters =>
                        handleFilters(filters, "price")
                    }
                />
            </div>
        </div></div>
        )
    }
    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    const handleFilterButton = () => {
        setFilter(false)
    }
    const loadFilterButton = () => {
        return (
          
                <button onClick={handleFilterButton} className="btn btn-info mt-lg-5 mt-sm-0 " style={{ display: filter ? '' : 'none' ,height:50}}>
                    Search Filter
                </button>
            )
      
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };
    

    return (
        <Layout
            title="Shop from Jombeli Store"
            description="Search and find product from our store."
            learnMore='jombeli.org'
            className="container-fluid"
            jumbo='jumbotron'
        >
            <div className="container" >
            <div className="row justify-content-center ">
           
               {loadFilter(filter)}
               {loadFilterButton()}
                <div className="col-10">
          
                    <div className="row text-center">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div></div>
        </Layout>
    );
};

export default Shop;
