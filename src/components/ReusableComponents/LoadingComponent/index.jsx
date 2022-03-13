import styles from "./styles.module.css";


function LoadingComponent() {


    return (
        <div className={styles.loadingContainer}>
            <img src="./images/loading.gif" alt="Loading..." className={styles.img}/>
            <p>Loading...</p>
        </div>
    );
}

export default LoadingComponent;