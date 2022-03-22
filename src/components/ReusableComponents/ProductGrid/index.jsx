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
    let query = params.get("q");

    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const allProductsPageLimit =
        pathName.includes('products') ? 12 : pathName.includes('home') ? 16 : 20

    function handleClick(page) {
        return setCurrentPage(page === 0 ? 1 : page)
    }

    let paramsArray = [
        'product',
        pathName === '/home' ? 16 : pathName === '/products' ? 30 : 20,
        pathName === '/home' ? 'Featured' : '',
        '',
        pathName === '/search' ? query : '',
    ]

    let {data, isLoading} = useWizelineData(
        paramsArray[0], paramsArray[1], paramsArray[2], paramsArray[3], paramsArray[4]);
    console.log(data)

    useEffect(() => {
        if ((data?.results?.length > 0)) {
            setProducts(data.results.slice(
                0, allProductsPageLimit)
            )
        }
    }, [data, pathName]);


    useEffect(() => {
        if (products.length > 0) {
            return setProducts(
                [...data.results.slice(
                    currentPage * allProductsPageLimit -
                    allProductsPageLimit, allProductsPageLimit * currentPage
                )])
        }
    }, [currentPage, data.results, products.length]);

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

                        <div className='buttonContainer'>
                            {pathName === '/home' ?
                                <button>
                                    <Link to="/products">
                                        View all products
                                    </Link>
                                </button>
                                :
                                <button>
                                    <Link to="/home">
                                        Return to homescreen
                                    </Link>
                                </button>
                            }
                        </div>

                        {
                            (pathName.includes('products') || pathName.includes('search')) &&

                            <div className={styles.paginationController}>
                                {currentPage !== 1 &&
                                    <div className={styles.paginationElement} onClick={() => {
                                        handleClick(currentPage - 1)
                                    }}>
                                        <i className={`fa fa-arrow-left`}/>
                                        Previous Page
                                    </div>
                                }
                                {products.length % allProductsPageLimit === 0 &&
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