import "./Navbar.css";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">

                    <div className="logo-container">
                        <i className="fa fa-dumpster-fire iconsMargin"/>
                        React Shop
                        <i className="fa fa-dumpster-fire iconsMargin"/>
                    </div>

                    <div className="search-container">
                        <input/>
                        <label className="fa fa-magnifying-glass fa-sm search-icon"/>
                    </div>

                    <i className="fa fa-shopping-cart iconsMargin"/>

                </div>
            </nav>
        </>
    );
}

export default Navbar;