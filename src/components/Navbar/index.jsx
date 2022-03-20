import styles from  "./styles.module.css";
import {useContext} from "react";
import {PageContext} from "../../contexts/pageContext";

function Navbar() {
     const [,dispatch] = useContext(PageContext)

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>

                    {/* eslint-disable-next-line max-len */}
                    <div onClick={() => dispatch({ type: "home" })} className={styles.logoContainer}>
                        <i className={`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                        React Shop
                        <i className= {`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                    </div>

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