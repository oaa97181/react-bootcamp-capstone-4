import styles from "./styles.module.css";
import {useWizelineData} from "../../utils/hooks/useWizelineData";
import LoadingComponent from "../../components/ReusableComponents/LoadingComponent";
import SlideShow from 'react-image-show';

function ProductDetailComponent() {

    const {data, isLoading} =
        useWizelineData('', '1', '', window.location.pathname.split('/')[2]);

    return (
        <>
            {
                isLoading ?
                    <LoadingComponent data={data}/>
                    :
                    <>
                        <div className={styles.productContainer}>

                            <div className={styles.productImageContainer}>

                                <SlideShow
                                    images={
                                        data.results[0].data.images.map((img) => {
                                            console.log(img)
                                            return img.image.url
                                        })}
                                    width="600px"
                                    imagesWidth="600px"
                                    imagesHeight="650px"
                                    imagesHeightMobile="56vw"
                                    thumbnailsWidth="920px"
                                    thumbnailsHeight="12vw"
                                    indicators thumbnails fixedImagesHeight
                                />
                            </div>

                            <div className={styles.productInfoContainer}>

                                <div className={styles.productDescription}>
                                    <span>{data.results[0].data.category.slug}</span>
                                    <h1>{data.results[0].data.name}</h1>
                                    <label>SKU: {data.results[0].data.sku}</label>
                                    <div>
                                        {data.results[0].tags.map((tag) => {
                                            return (
                                                <label>
                                                    <i className={`fa fa-tag ${styles.tagIcon}`}/>
                                                    {tag}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <p>{data.results[0].data.description[0].text}</p>
                                    <ul>
                                        {data.results[0].data.specs.map((spec) => {
                                            return (
                                                <li>{spec.spec_name}: {spec.spec_value}</li>
                                            )
                                        })}
                                    </ul>
                                </div>


                                <div className={styles.productPrice}>
                                    <span>${data.results[0].data.price}</span>
                                    <div className='buttonContainer'>
                                        <input type="number" defaultValue={1}
                                               className={styles.quantityInput} min="1" max="100"/>
                                        <button>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </>
            }
        </>
    );
}

export default ProductDetailComponent;