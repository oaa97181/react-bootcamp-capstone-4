import "./styles.css";
import PropTypes from "prop-types";

function Sidebar({productCategories, categoryArray, setCategoryArray}) {

    function handleChange(e, value) {
        // eslint-disable-next-line max-len
        return categoryArray.indexOf(value) === -1 ? setCategoryArray([...categoryArray, value]) : setCategoryArray(categoryArray.filter(item => item !== value));
    }

    function openSidebar() {
        document.getElementById("filterSidebar").style.display = "block";
        document.getElementById("sidebarIcon").style.display = "none";

    }

    function closeSidebar() {
        document.getElementById("filterSidebar").style.display = "none";
        document.getElementById("sidebarIcon").style.display = "block";
    }

    return (
        <>
            <button className="sidebar-button" onClick={openSidebar} id='sidebarIcon'>☰</button>

            <div className="sidebar-container" id="filterSidebar">

                <button className="close-button" onClick={closeSidebar}>Close &times;</button>

                {productCategories.results.map(category => {
                    return (
                        <div key={category.data.name} className="sidebar-button"
                             onChange={(e) => {
                                 handleChange(e, category.data.name.toLowerCase())
                             }}>
                            <input type="checkbox" name={category.data.name}
                                   value={category.data.name}/>
                            <label> {category.data.name}</label>
                        </div>
                    )
                })}
            </div>
        </>
    );
}


Sidebar.propTypes = {
    productCategories: PropTypes.object.isRequired,
    categoryArray: PropTypes.array.isRequired,
    setCategoryArray: PropTypes.func.isRequired,
};

export default Sidebar;