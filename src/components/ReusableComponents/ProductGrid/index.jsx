import styles from "./styles.module.css";
import ProductCard from "../ProductCard";

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
        </>
    );
}

export default ProductGrid;