import styles from "./styles.module.css";
import {useWizelineData} from "../../../utils/hooks/useWizelineData";
import LoadingComponent from "../../ReusableComponents/LoadingComponent";
import {Link} from "react-router-dom";

function CategoryGrid() {
    const {data, isLoading} = useWizelineData('category', 30);

    return (
        <>
            {
                isLoading ?
                    <LoadingComponent data={data}/>
                    :
                    <section className={styles.categoryContainer}>
                        {data.results.map(category => {
                            return (
                                <div className={styles.imgContainer} key={category.id}>
                                <Link to={`/products?category=${category.slugs[0]}`}>
                                    <img className={styles.categoryImg}
                                         src={category.data.main_image.url}
                                         alt={category.data.name}/>
                                    <p>{category.data.name}</p>
                                </Link>
                                </div>
                            )
                        })}
                    </section>
            }
        </>
    );
}

export default CategoryGrid;