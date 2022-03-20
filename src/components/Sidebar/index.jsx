import "./styles.css";
import PropTypes from "prop-types";

function Sidebar({productCategories, categoryArray, setCategoryArray}) {

    function handleChange(e, value) {
        return categoryArray.indexOf(value) === -1 ?
            setCategoryArray([...categoryArray, value]) :
            setCategoryArray(categoryArray.filter(item => item !== value));
    }

    function openSidebar() {
        document.getElementById("sidebar-container").style.display = "block";
        document.getElementById("sidebar-button").style.display = "none";

    }

    function closeSidebar() {
        document.getElementById("sidebar-container").style.display = "none";
        document.getElementById("sidebar-button").style.display = "block";
    }

    return (
        <>
            <button className="sidebar-button" onClick={openSidebar} id='sidebar-button'>☰</button>

            <div className="sidebar-container" id="sidebar-container">

                <button className="close-button" onClick={closeSidebar}>Close &times;</button>

                {productCategories.results.map(category => {
                    return (
                        <div key={category.data.name} className="sidebar-filter"
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