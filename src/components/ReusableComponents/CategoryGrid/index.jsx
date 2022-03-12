import styles from "./styles.module.css";
import PropTypes from "prop-types";

function CategoryGrid({data}) {

    return (
        <>
            <section className={styles.categoryContainer}>
                {data.results.map(category => {
                    return (
                        <div className={styles.imgContainer} key={category.id}>
                            <img className={styles.categoryImg} src={category.data.main_image.url}
                                 alt={category.data.name}/>
                            <p>{category.data.name}</p>
                        </div>
                    )
                })}

            </section>

        </>
    );
}

CategoryGrid.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CategoryGrid;