import styles from "./styles.module.css";
import PropTypes from "prop-types";

function Sidebar({productCategories, categoryArray, setCategoryArray}) {

    function handleChange(e, value) {
        // eslint-disable-next-line max-len
        return categoryArray.indexOf(value) === -1 ? setCategoryArray([...categoryArray, value]) : setCategoryArray(categoryArray.filter(item => item !== value));
    }

    return (
        <>
            {productCategories.results.map(category => {
                return (
                    <div key={category.data.name} onChange={(e) => {
                        handleChange(e, category.data.name.toLowerCase())
                    }}>
                        <input type="checkbox" name={category.data.name}
                               value={category.data.name}/>
                        <label> {category.data.name}</label>
                    </div>
                )
            })}
        </>
    );
}


Sidebar.propTypes = {
    productCategories: PropTypes.object.isRequired,
    categoryArray:PropTypes.array.isRequired,
    setCategoryArray:PropTypes.func.isRequired,
};

export default Sidebar;