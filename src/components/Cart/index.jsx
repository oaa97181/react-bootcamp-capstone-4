import {useContext, useEffect, useState} from "react";
import CartContext from "../../contexts/CartContext";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";
import RedirectComponent from "../ReusableComponents/RedirectComponent";


function Cart() {

    const {state, dispatch} = useContext(CartContext);

    const [totalUnits, setTotalUnits] = useState(
        state?.products.map((product) => {
            return parseInt(product.units)
        }));

    const [totalPrice, setTotalPrice] = useState(
        state?.products.map((product) => {
            return parseInt(product.units) * product.singleProduct.price
        }));

    const handleInputsChange = (event, product) => {
        if (event.target.value > product.stock) {
            return alert('Not enough stock, please choose less units')
        }
        return dispatch({
            type: "UPDATE_PRODUCT",
            payload: {
                singleProduct:
                product,
                NEWunits:
                event.target.value,
            },
        });
    };

    const removeItemFromCart = (event, product) => {
        return dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                singleProduct:
                product,
            },
        });
    };

    const clearCart = () => {
        alert('Cart is cleared! :D');
        return dispatch({
            type: "CLEAR_CART",
        });
    };

    useEffect(() => {
        setTotalUnits(state?.products.map((product) => {
            return parseInt(product.units)
        }))
        setTotalPrice(state?.products.map((product) => {
            return parseInt(product.units) * product.singleProduct.price
        }))
    }, [state]);

    return (
        <>
            {state.products.length >= 1 ?

                <div className={styles.CartContainer}>
                    <div className={styles.Header}>
                        <h3 className={styles.Heading}>Shopping Cart</h3>
                        <h5
                            className={styles.Action}
                            onClick={() => {
                                clearCart()
                            }}
                        >
                            Remove all
                        </h5>
                    </div>

                    {state.products.map((product) => {
                        return (
                            <div className={styles.CartItems} key={product.singleProduct.sku}>
                                <div className={styles.imagebox}>
                                    <img
                                        src={product.singleProduct.mainimage.url}
                                        className={styles.image}
                                        alt={product.singleProduct.name}/>
                                </div>
                                <div className={styles.about}>
                                    <h1 className={styles.title}>{product.singleProduct.name}</h1>
                                </div>
                                <div className={styles.counter}>
                                    <div className={styles.count}>
                                        <input
                                            type="number"
                                            className={styles.quantityInput}
                                            min={1}
                                            max={product.singleProduct.stock}
                                            defaultValue={product.units}
                                            onChange={(event) => {
                                                handleInputsChange(event, product.singleProduct)
                                            }}
                                        />
                                        x ${product.singleProduct.price}
                                    </div>
                                </div>
                                <div className={styles.prices}>
                                    <div className={styles.amount}>
                                        ${product.singleProduct.price * product.units}
                                    </div>

                                    <div
                                        className={styles.remove}
                                        onClick={(event) => {
                                            removeItemFromCart(event, product.singleProduct)
                                        }}
                                    >
                                        <u>Remove</u>
                                    </div>
                                </div>
                            </div>

                        )

                    })}

                    <hr className={styles.line}/>
                    <div className={styles.checkout}>
                        <div className={styles.total}>
                            <div>
                                <div className={styles.Subtotal}>Sub-Total</div>
                                <div className={styles.items}>
                                    {totalUnits.reduce((a, b) => a + b)} items
                                </div>
                            </div>
                            <div className={styles.totalamount}>
                                ${totalPrice.reduce((a, b) => a + b)}
                            </div>
                        </div>
                        <Link to='/checkout'>
                            <div className='buttonContainer'>
                                <button style={{width: '100%', borderRadius: '40px'}}>
                                    Proceed to checkout
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
                :
                <RedirectComponent/>
            }

        </>
    )
        ;
}

export default Cart;
