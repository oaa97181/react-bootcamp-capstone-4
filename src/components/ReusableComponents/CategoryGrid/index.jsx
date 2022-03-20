import styles from "./styles.module.css";
import {useWizelineData} from "../../../utils/hooks/useWizelineData";
import LoadingComponent from "../LoadingComponent";

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
                                    <img className={styles.categoryImg}
                                         src={category.data.main_image.url}
                                         alt={category.data.name}/>
                                    <p>{category.data.name}</p>
                                </div>
                            )
                        })}
                    </section>
            }
        </>
    );
}

export default CategoryGrid;