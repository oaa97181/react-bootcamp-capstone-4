import styles from "./styles.module.css";

function ProductCard({product}) {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={styles.cardItem} key={product.id}>
            <div className={styles.cardName}>
                <p>{product.data.name}</p>
            </div>
            <img src={product.data.mainimage.url} alt={product.data.name}/>
            <div className={styles.infoContainer}>
                <p className={styles.category}>{product.data.category.slug}</p>
                <p>${numberWithCommas(product.data.price)}</p>
            </div>
        </div>
    );
}

export default ProductCard;