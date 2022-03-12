import styles from "./styles.module.css";
import ProductCard from "../ProductCard";
import PropTypes from "prop-types";


function ProductGrid({data}) {

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
                <button>View all products</button>
            </div>
        </>
    );
}

ProductGrid.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductGrid;