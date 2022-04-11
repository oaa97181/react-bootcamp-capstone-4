import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import {Link} from "react-router-dom";
import {useWizelineData} from "../../../utils/hooks/useWizelineData";
import LoadingComponent from "../LoadingComponent";
import {useCallback, useEffect, useState} from "react";
import Sidebar from "../../Sidebar";


function ProductGrid() {

    const [categoryArray, setCategoryArray] = useState([]);

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

    const paginateArray = useCallback(
        (array) => {
            return array.slice(
                currentPage * pageLimit -
                pageLimit, pageLimit * currentPage)

        },
        [currentPage, pageLimit]
    );

    useEffect(() => {
        if (data?.results?.length > 0) {
            if (categoryArray && categoryArray.length >= 1) {
                return setProducts(paginateArray(data.results.filter(product =>
                    categoryArray.includes(product.data.category.slug))))
            }

            if (searchQuery && searchQuery !== '') {
                return setProducts(paginateArray(data.results.filter(product =>
                    product.data.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
                )))
            } else if (searchQuery === '') {
                return setProducts(paginateArray([...data.results]))
            }

            return setProducts(paginateArray([...data.results]))
        }
    }, [categoryArray, searchQuery, data.results, paginateArray]);


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

    function renderPaginationControls() {
        return !pathName.includes('home') &&
            <div className={styles.paginationController}>
                {currentPage !== 1 &&
                    <div className={styles.paginationElement} onClick={() => {
                        handleClick(currentPage - 1)
                    }}>
                        <i className={`fa fa-arrow-left`}/>
                        Previous Page
                    </div>
                }
                Page: {currentPage}
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

    return (
        <>
            {
                isLoading ?
                    <LoadingComponent data={data}/>
                    :
                    <div className={styles.productGridContainer}>

                        {!pathName.includes('home') &&
                            <Sidebar
                                categoryArray={categoryArray}
                                setCategoryArray={setCategoryArray}
                            />
                        }

                        <div className={styles.productGridSubContainer}>
                            <div className={styles.subtitle}>
                                <h2>
                                    {
                                        pathName === '/home' ?
                                            'Featured Products' :
                                            'All Products'
                                    }
                                </h2>
                            </div>
                            {renderProductCards()}
                        </div>

                        <div style={{margin: 'auto', width: '0px'}}>
                            <Link to={pathName === '/home' ? "/products" : '/home'}
                                  style={{width: '100px'}}>
                                <div className='buttonContainer'>
                                    <button>
                                        {
                                            pathName === '/home' ?
                                                'View all products' :
                                                ' Return to homescreen'
                                        }
                                    </button>
                                </div>
                            </Link>
                        </div>

                        {renderPaginationControls()}

                    </div>
            }
        </>
    );
}

export default ProductGrid;