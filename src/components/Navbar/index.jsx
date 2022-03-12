import styles from  "./styles.module.css";

function Navbar() {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>

                    <div>
                        <i className={`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                        React Shop
                        <i className= {`fa fa-dumpster-fire ${styles.iconsMargin}`}/>
                    </div>

                    <div className={styles.searchContainer}>
                        <input/>
                        <label className={`fa fa-magnifying-glass fa-sm ${styles.searchIcon}`}/>
                    </div>

                    <i className={`fa fa-shopping-cart ${styles.iconsMargin}`}/>

                </div>
            </nav>
        </>
    );
}

export default Navbar;