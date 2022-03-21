import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useWizelineData} from "../../../utils/hooks/useWizelineData";
import LoadingComponent from "../LoadingComponent";


function ProductGrid({title, categoryArray}) {
    const pathName = window.location.pathname;

    const {
        data,
        isLoading,
    } = useWizelineData('product',
        pathName === '/home' ? 16 : 1000, pathName === '/home' ? 'Featured' : '');


    function renderProductCards() {
        let productCardsArray = data.results.map((product) => {
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
            <div className={styles.noProdcuts}> No products found for selected categories
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

                        {pathName === 'productList' &&
                            <div className={styles.paginationController}>
                                <div className={styles.paginationElement}>
                                    <i className={`fa fa-arrow-left`}/>
                                    Previous Page
                                </div>
                                <div className={styles.paginationElement}>
                                    <i className={`fa fa-arrow-right`}/>
                                    Next Page
                                </div>
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