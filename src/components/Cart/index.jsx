import {useContext, useState} from "react";
import CartContext from "../../contexts/CartContext";
import styles from "./styles.module.css";
import {Link} from "react-router-dom";


function Cart() {

    const {state, dispatch} = useContext(CartContext);
    console.log(state)

    const [totalUnits, setTotalUnits] = useState(
        state?.products.map((product) => {
            return parseInt(product.units)
        }));

    const [totalPrice, setTotalPrice] = useState(
        state?.products.map((product) => {
            return parseInt(product.units) * product.singleProduct.price
        }));

    console.log(totalUnits)
    console.log(totalPrice)

    return (
        <>
            {state.products.length >= 1 ?

                <div className={styles.CartContainer}>
                    <div className={styles.Header}>
                        <h3 className={styles.Heading}>Shopping Cart</h3>
                        {/*TODO clear cart*/}
                        <h5 className={styles.Action}>Remove all</h5>
                    </div>

                    {state.products.map((product) => {
                        console.log(product)
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
                                        {/*TODO add input*/}
                                        {product.units} x ${product.singleProduct.price}
                                    </div>
                                </div>
                                <div className={styles.prices}>
                                    <div className={styles.amount}>
                                        ${product.singleProduct.price * product.units}
                                    </div>
                                    {/*TODO remove whole item*/}
                                    <div className={styles.remove}><u>Remove</u></div>
                                </div>
                            </div>

                        )

                    })}

                    <hr/>
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
                                <button  style={{width: '100%', borderRadius: '40px'}}>
                                    Checkout
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
                :
                <p>Cart is empty :(</p>
            }

        </>
    )
        ;
}

export default Cart;
