import styles from "./styles.module.css";
import {Link} from "react-router-dom";

function Navbar() {

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
                        <input className={styles.searchInput} placeholder="Search.."/>
                        <label className={`fa fa-magnifying-glass fa-sm ${styles.searchIcon}`}/>
                    </div>

                    <i className={`fa fa-shopping-cart ${styles.iconsMargin}`}/>

                </div>
            </nav>
        </>
    );
}

export default Navbar;