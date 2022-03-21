import "./styles.css";
import PropTypes from "prop-types";
import {useWizelineData} from "../../utils/hooks/useWizelineData";

function Sidebar({categoryArray, setCategoryArray}) {

    const {data, isLoading} = useWizelineData('category', 30);

    function handleChange(e, value) {
        return categoryArray.indexOf(value) === -1 ?
            setCategoryArray([...categoryArray, value]) :
            setCategoryArray(categoryArray.filter(item => item !== value));
    }

    function clearFilters() {
        return setCategoryArray([])
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
            {
                !isLoading &&
                <>
                    <button className="sidebar-button" onClick={openSidebar}
                            id='sidebar-button'>☰
                    </button>

                    <div className="sidebar-container" id="sidebar-container">

                        <button className="close-button"
                                onClick={closeSidebar}>Close &times;</button>

                        {data.results.map(category => {
                            const categoryName = category.data.name;
                            return (
                                <div key={category.data.name} className="sidebar-filter">
                                    <input type="checkbox"
                                           name={categoryName}
                                           value={categoryName}
                                           checked={
                                               categoryArray.includes(categoryName.toLowerCase())}
                                           onChange={(e) => {
                                               handleChange(e, categoryName.toLowerCase())
                                           }}
                                    />
                                    <label> {categoryName}</label>
                                </div>
                            )
                        })}
                        {
                            categoryArray.length >= 1 &&
                            <div className="buttonContainer">
                            <button
                                onClick={() => {
                                clearFilters()
                            }}> Clear all filters
                            </button>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    );
}


Sidebar.propTypes = {
    categoryArray: PropTypes.array.isRequired,
    setCategoryArray: PropTypes.func.isRequired,
};

export default Sidebar;