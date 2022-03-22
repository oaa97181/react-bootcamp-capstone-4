import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function LoadingComponent(data) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data.data.results) {
            setIsLoading(false)
        }
    }, [data]);

    return (
        isLoading &&
        <>
            <div className={styles.loadingContainer}>
                <img src="/images/loading.gif" alt="Loading..." className={styles.img}/>
                <p>Loading...</p>
            </div>
        </>
    );
}

LoadingComponent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default LoadingComponent;