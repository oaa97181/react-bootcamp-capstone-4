import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import {PageContext} from "../../../contexts/pageContext";
import {useContext} from "react";


function ProductGrid({products, title, categoryArray}) {
    const [state, dispatch] = useContext(PageContext)

    function renderProductCards() {
        let productCardsArray = products.results.map((product) => {
            if (categoryArray) {
                if (categoryArray.length === 0) {
                    //return all since no category is selected
                    return <ProductCard product={product} key={product.id}/>
                } else {
                    //filter by category
                    return categoryArray.includes(product.data.category.slug) &&
                        <ProductCard product={product} key={product.id}/>
                }
            } else {
                //return all, without category filters
                return <ProductCard product={product} key={product.id}/>
            }
        })

        return productCardsArray.every(productCard => productCard === false) ?
            <div className={styles.noProdcuts}> No products found for selected categories
                😭 </div> : productCardsArray
    }

    return (
        <>
            <div className={styles.productGridContainer}>
                <div className={styles.subtitle}>
                    <h2>{title}</h2>
                </div>
                {renderProductCards()}
            </div>
            <div className={styles.buttonContainer}>
                {state.page === 'home' ?
                    <button onClick={() => dispatch({type: "productList"})}>View all
                        products</button>
                    :
                    <button onClick={() => dispatch({type: "home"})}>Return to homescreen</button>
                }

            </div>
            {state.page === 'productList' &&
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
    );
}

ProductGrid.propTypes = {
    products: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    categoryArray: PropTypes.array,
};

export default ProductGrid;