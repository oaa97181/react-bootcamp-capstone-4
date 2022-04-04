import styles from "./styles.module.css";
import {Link, useHistory} from "react-router-dom";
import {createRef, useContext} from "react";
import CartContext from "../../../contexts/CartContext";


function Navbar() {
    const {state} = useContext(CartContext);

    const history = useHistory();
    const redirectToSearch = () => {
        history.push(`/search?q=${textInput.current.value}`);
    };

    let textInput = createRef();

    const totalProducts =
        state?.products.map((product) => {
            return parseInt(product.units)
        })

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>

                    <Link to="/home">
                        <div className={styles.logoContainer}>
                            <i className={`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                            React Shop
                            <i className={`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                        </div>
                    </Link>

                    <div className={styles.searchContainer}>
                        <input
                            className={styles.searchInput}
                            placeholder="Type something..."
                            ref={textInput}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    redirectToSearch()
                                }
                            }}
                        />
                        <label className={`fa fa-magnifying-glass fa-sm ${styles.searchIcon}`}/>

                        <button
                            type='submit'
                            className={styles.searchButton}
                            onClick={() => {
                                redirectToSearch()
                            }}
                        >
                            Search!
                        </button>
                    </div>

                    <Link to="/cart">
                        <div className={styles.badgeCartCounter}>
                            {totalProducts.length>=1 && totalProducts.reduce((a, b) => a + b)}
                        </div>
                        <i className={`fa fa-shopping-cart ${styles.iconsMargin}`}/>
                    </Link>

                </div>
            </nav>
        </>
    );
}

export default Navbar;