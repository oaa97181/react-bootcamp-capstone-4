import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import {PageContext} from "../../../contexts/pageContext";
import {useContext} from "react";


function ProductGrid({products, title}) {
    const [state, dispatch] = useContext(PageContext)


    return (
        <>
            <div className={styles.productGridContainer}>
                <div className={styles.subtitle}>
                    <h2>{title}</h2>
                </div>
                {products.results.map((product) => {
                    return (
                        <ProductCard product={product} key={product.id}/>
                    )
                })}
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
};

export default ProductGrid;