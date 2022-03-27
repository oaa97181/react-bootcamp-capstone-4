import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useWizelineData} from "../../../utils/hooks/useWizelineData";
import LoadingComponent from "../LoadingComponent";
import {useEffect, useState} from "react";


function ProductGrid({title, categoryArray}) {
    const pathName = window.location.pathname;
    let params = (new URL(document.location)).searchParams;
    let searchQuery = params.get("q");

    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const pageLimit =
        pathName.includes('products') ? 12 : 16

    function handleClick(page) {
        return setCurrentPage(page === 0 ? 1 : page)
    }

    let paramsArray = [
        pathName === '/home' ? 16 : 100,
        pathName === '/home' ? 'Featured' : '',
    ]

    let {data, isLoading} = useWizelineData(
        'product', paramsArray[0], paramsArray[1], '');
    // console.log(data)

    useEffect(() => {
        if (data?.results?.length > 0) {
            if (categoryArray && categoryArray.length >= 1) {
                return setProducts(data.results.filter(product =>
                    categoryArray.includes(product.data.category.slug)))
            }
            if (searchQuery && searchQuery !== '') {
                return setProducts(data.results.filter(product =>
                    product.data.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                ))
            } else if (searchQuery === '') {
                return setProducts([...data.results])
            }
            return setProducts(
                [...data.results.slice(
                    currentPage * pageLimit -
                    pageLimit, pageLimit * currentPage
                )])
        }
    }, [pageLimit, categoryArray, currentPage, products.length,
        searchQuery, data.results]);

    function renderProductCards() {
        let productCardsArray = products.map((product) => {
            const cardWithLink =
                <Link to={`/product/${product.id}`} key={product.id + '-link'}>
                    <ProductCard product={product}/>
                    <div className='buttonContainer'>
                        <button>
                            Add to cart
                        </button>
                    </div>
                </Link>

            if (categoryArray) {
                if (categoryArray.length === 0) {
                    //return all since no category is selected
                    return cardWithLink
                } else {
                    //filter by category
                    return categoryArray.includes(product.data.category.slug) && cardWithLink
                }
            } else {
                //return all, without category filters
                return cardWithLink
            }
        })

        return productCardsArray.every(productCard => productCard === false) ?
            <div className={styles.noProdcuts}> No more products found
                😭 </div> : productCardsArray
    }

    return (
        <>
            {
                isLoading ?
                    <LoadingComponent data={data}/>
                    :
                    <>
                        <div className={styles.productGridContainer}>
                            <div className={styles.subtitle}>
                                <h2>{title}</h2>
                            </div>
                            {renderProductCards()}
                        </div>

                        <div style={{margin: 'auto', width: '0px'}}>
                            {pathName === '/home' ?
                                <Link to="/products" style={{width: '100px'}}>
                                    <div className='buttonContainer'>
                                        <button>
                                            View all products
                                        </button>
                                    </div>
                                </Link>
                                :
                                <Link to="/home">
                                    <div className='buttonContainer'>
                                        <button>
                                            Return to homescreen
                                        </button>
                                    </div>
                                </Link>
                            }
                        </div>

                        {pathName.includes('products') &&
                            <div className={styles.paginationController}>
                                {currentPage !== 1 &&
                                    <div className={styles.paginationElement} onClick={() => {
                                        handleClick(currentPage - 1)
                                    }}>
                                        <i className={`fa fa-arrow-left`}/>
                                        Previous Page
                                    </div>
                                }
                                {products.length % pageLimit === 0 &&
                                    <div className={styles.paginationElement} onClick={() => {
                                        handleClick(currentPage + 1)
                                    }}>
                                        <i className={`fa fa-arrow-right`}/>
                                        Next Page
                                    </div>
                                }
                            </div>
                        }

                    </>
            }
        </>
    );
}

ProductGrid.propTypes = {
    title: PropTypes.string.isRequired,
    categoryArray: PropTypes.array,
};

export default ProductGrid;