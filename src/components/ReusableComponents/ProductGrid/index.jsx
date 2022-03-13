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
                    // eslint-disable-next-line max-len
                    return categoryArray.includes(product.data.category.slug) &&
                        <ProductCard product={product} key={product.id}/>
                }
            } else {
                //return all, without category filters
                return <ProductCard product={product} key={product.id}/>
            }
        })

                    //TODO add styles
        return productCardsArray.every(v => v === false) ? <>123 </> : productCardsArray
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
        </>
    );
}

ProductGrid.propTypes = {
    products: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    categoryArray: PropTypes.array,
};

export default ProductGrid;