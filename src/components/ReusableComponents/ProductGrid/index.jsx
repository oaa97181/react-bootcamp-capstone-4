import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";
import {PageContext} from "../../../contexts/pageContext";
import {useContext} from "react";


function ProductGrid({data}) {
      const [ state, dispatch ] = useContext(PageContext)


    return (
        <>
            <div className={styles.productGridContainer}>
                <div className={styles.subtitle}>
                    <h2>featured products</h2>
                </div>
                {data.results.map((product) => {
                    return (
                        <ProductCard product={product} key={product.id}/>
                    )
                })}
            </div>
            <div className={styles.buttonContainer}>
                {/* eslint-disable-next-line max-len */}
                <button onClick={() => dispatch({ type: "productList" })}>View all products</button>
            </div>
        </>
    );
}

ProductGrid.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductGrid;