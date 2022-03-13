import styles from "./styles.module.css";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

function Sidebar({productCategories}) {

    const [categoryArray, setCategoryArray] = useState([]);

    function handleChange(e, value) {
        // eslint-disable-next-line max-len
        return categoryArray.indexOf(value) === -1 ? setCategoryArray([...categoryArray, value]) : setCategoryArray(categoryArray.filter(item => item !== value));
    }

    useEffect(() => {
        console.log(categoryArray)
    }, [categoryArray]);


    return (
        <>
            {productCategories.results.map(category => {
                return (
                    <div key={category.data.name} onChange={(e) => {
                        handleChange(e, category.data.name)
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
};

export default Sidebar;