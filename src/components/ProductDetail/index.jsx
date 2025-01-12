import styles from "./styles.module.css";
import {useWizelineData} from "../../utils/hooks/useWizelineData";
import LoadingComponent from "../../components/ReusableComponents/LoadingComponent";
import SlideShow from 'react-image-show';
import {createRef, useContext, useEffect, useState} from "react";
import CartContext from "../../contexts/CartContext";
import {add, update} from "../../contexts/actionTypes";

function ProductDetailComponent() {
    const {data, isLoading} =
        useWizelineData('', '1', '', window.location.pathname.split('/')[2]);

    const {state, dispatch} = useContext(CartContext);

    const [inputsValue, setInputsValue] = useState(1);
    const [productIsInCartArray, setproductIsInCartArray] = useState([]);

    let productQuantityInput = createRef();


    const handleInputsChange = event => {
        let {value, min, max} = event.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setInputsValue(value);
    };

    useEffect(() => {
        if (state.products.length !== 0 && data.results && data.results.length !== 0) {
            setproductIsInCartArray(
                state.products.map((product) => {
                    return (product.singleProduct.sku
                        === data.results[0].data.sku)
                }))
        }
    }, [state.products, data.results]);

    useEffect(() => {
        let indexOfCurrentProduct = productIsInCartArray.indexOf(true)
        if (indexOfCurrentProduct !== -1) {
            setInputsValue(state.products[indexOfCurrentProduct].units)
        }
    }, [productIsInCartArray]);


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
                                            return img.image.url
                                        })}
                                    width="600px"
                                    imagesWidth="600px"
                                    imagesHeight="600px"
                                    imagesHeightMobile="50vw"
                                    thumbnailsWidth="600px"
                                    thumbnailsHeight="12vw"
                                    indicators
                                    thumbnails
                                    fixedImagesHeight={true}
                                />
                            </div>

                            <div className={styles.productInfoContainer}>

                                <div className={styles.productDescription}>
                                    <span data-testid="CATEGORY">
                                        {data.results[0].data.category.slug}
                                    </span>
                                    <h1 data-testid="NAME">{data.results[0].data.name}</h1>
                                    <label data-testid="SKU">SKU: {data.results[0].data.sku}</label>
                                    <div data-testid="TAGS">
                                        {data.results[0].tags.map((tag) => {
                                            return (
                                                <label key={tag}>
                                                    <i className={`fa fa-tag ${styles.tagIcon}`}/>
                                                    {tag}
                                                </label>
                                            )
                                        })}
                                    </div>
                                    <p data-testid="DESCRIPTION">
                                        {data.results[0].data.description[0].text}
                                    </p>
                                    <ul>
                                        {data.results[0].data.specs.map((spec) => {
                                            return (
                                                <li key={spec.spec_name}>
                                                    {spec.spec_name}: {spec.spec_value}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>


                                <div className={styles.productPrice}>
                                    <span data-testid="PRICE">${data.results[0].data.price}</span>
                                    <div className='buttonContainer'>
                                        <input
                                            data-testid="QUANTITY_INPUT"
                                            ref={productQuantityInput}
                                            type="number"
                                            className={styles.quantityInput}
                                            min={0}
                                            max={data.results[0].data.stock}
                                            value={inputsValue}
                                            onChange={handleInputsChange}
                                        />

                                        {data.results[0].data.stock >= 1 &&
                                            <button
                                                data-testid="CART_BUTTON"
                                                disabled={
                                                    (inputsValue === data.results[0].data.stock
                                                        && productIsInCartArray.includes(true))
                                                    || inputsValue === 0
                                                }
                                                onClick={() => {

                                                    if (productIsInCartArray.includes(true)) {
                                                        dispatch({
                                                            type: update,
                                                            payload: {
                                                                singleProduct:
                                                                data.results[0].data,
                                                                NEWunits:
                                                                productQuantityInput.current.value,
                                                            },
                                                        });
                                                    } else {
                                                        dispatch({
                                                            type: add,
                                                            payload: {
                                                                singleProduct:
                                                                data.results[0].data,
                                                                units:
                                                                productQuantityInput.current.value,
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                {inputsValue === 0 ? 'Disabled' :
                                                    inputsValue ===
                                                    data.results[0].data.stock &&
                                                    productIsInCartArray.includes(true)
                                                        ? "Can't add more than available stock" :
                                                        productIsInCartArray.includes(true) ?
                                                            'Update cart' : 'Add to cart'
                                                }
                                            </button>
                                        }
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