import "./styles.css";
import {Link} from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import {useContext, useEffect, useState} from "react";
import RedirectComponent from "../ReusableComponents/RedirectComponent";
import ErrorBoundary from "../ReusableComponents/ErrorBoundary";

function Checkout() {

    const {state} = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(
        state?.products.map((product) => {
            return parseInt(product.units) * product.singleProduct.price
        }));

    useEffect(() => {
        setTotalPrice(state?.products.map((product) => {
            return parseInt(product.units) * product.singleProduct.price
        }))
    }, [state]);


    return (
        <>
            {state.products.length >= 1 ?

                <div className="checkoutMainContainer">

                    <div className="row">
                        <div className="col-75">
                            <div className="container">
                                <form>
                                    <div className="row">
                                        <div className="col-50">
                                            <h3>Billing Address</h3>
                                            <label className="label" htmlFor="fname">
                                                <i className={'fa fa-user'}/>
                                                Full Name</label>
                                            <input type="text" id="fname" name="firstname"
                                                   placeholder="John M. Doe"/>
                                            <label className="label" htmlFor="email">
                                                <i className={"fa fa-envelope"}/>
                                                Email</label>
                                            <input type="text" id="email" name="email"
                                                   placeholder="john@example.com"/>
                                            <label className="label" htmlFor="adr">
                                                <i className={"fa fa-address-card-o"}/>
                                                Address</label>
                                            <input type="text" id="adr" name="address"
                                                   placeholder="542 W. 15th Street"/>
                                            <label className="label" htmlFor="city">
                                                <i className={"fa fa-institution"}/>
                                                City</label>
                                            <input type="text" id="city" name="city"
                                                   placeholder="New York"/>

                                            <div className="row">
                                                <div className="col-50">
                                                    <label className="label"
                                                           htmlFor="state">State</label>
                                                    <input type="text" id="state"
                                                           name="state" placeholder="NY"/>
                                                </div>
                                                <div className="col-50">
                                                    <label className="label"
                                                           htmlFor="zip">Zip</label>
                                                    <input type="text" id="zip" name="zip"
                                                           placeholder="10001"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-50">
                                            <h3>Payment</h3>
                                            <label className="label" htmlFor="fname">Accepted
                                                Cards</label>
                                            <div className="icon-container">
                                                <i className={"fa fa-cc-visa"}
                                                   style={{color: "navy", padding: '0 5px'}}/>
                                                <i className={"fa fa-cc-amex"}
                                                   style={{color: "blue", padding: '0 5px'}}/>
                                                <i className={"fa fa-cc-mastercard"}
                                                   style={{color: "red", padding: '0 5px'}}/>
                                                <i className={"fa fa-cc-discover"}
                                                   style={{color: "orange", padding: '0 5px'}}/>
                                            </div>
                                            <label className="label" htmlFor="cname">Name on
                                                Card</label>
                                            <input type="text" id="cname" name="cardname"
                                                   placeholder="John More Doe"/>
                                            <label className="label" htmlFor="ccnum">Credit card
                                                number</label>
                                            <input type="text" id="ccnum" name="cardnumber"
                                                   placeholder="1111-2222-3333-4444"/>
                                            <label className="label" htmlFor="expmonth">Exp
                                                Month</label>
                                            <input type="text" id="expmonth" name="expmonth"
                                                   placeholder="September"/>
                                            <div className="row">
                                                <div className="col-50">
                                                    <label className="label" htmlFor="expyear">Exp
                                                        Year</label>
                                                    <input type="text" id="expyear"
                                                           name="expyear" placeholder="2018"/>
                                                </div>
                                                <div className="col-50">
                                                    <label className="label"
                                                           htmlFor="cvv">CVV</label>
                                                    <input type="text" id="cvv" name="cvv"
                                                           placeholder="352"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <label>
                                        <input type="checkbox" name="sameadr"
                                               defaultChecked={true}/> Shipping
                                        address same as billing
                                    </label>
                                </form>
                            </div>
                        </div>

                        <div className="col-25">
                            <div className="container order-container">
                                <h4>Cart
                                    <span className="price" style={{color: "black"}}>
                            <i className="fa fa-shopping-cart"/>
                            <b>({state.products.length})</b>
                                 </span>
                                </h4>
                                {state.products.map((product) => {
                                    return (
                                        <p key={product.singleProduct.sku}>
                                            {product.singleProduct.name} ({product.units})
                                            <span className="price">
                                        ${product.units * product.singleProduct.price}
                                    </span>
                                        </p>
                                    )
                                })}
                                <hr className='divider'/>
                                <p>Total <span className="price" style={{color: "black"}}>
                            <b>${totalPrice.reduce((a, b) => a + b)}</b>
                                </span>
                                </p>
                            </div>
                            <Link to="/cart">
                                <div className='buttonContainer' style={{padding: '10px'}}>
                                    <button className='btn'>
                                        Go back to cart
                                    </button>
                                </div>
                            </Link>

                            <div className='buttonContainer' style={{padding: '10px'}}
                                 onClick={() => {
                                     alert('Checkout logic goes right here')
                                 }}>
                                <button className='btn'>
                                    Place order
                                </button>
                            </div>

                            <ErrorBoundary>
                                <div className='buttonContainer'
                                     style={{padding: '10px'}}
                                     onClick={() => {
                                         throw new Error('I crashed!');
                                     }}
                                >
                                    <button className='btn'
                                            style={{backgroundColor: 'red'}}>
                                        Press for error boundary
                                    </button>
                                </div>
                            </ErrorBoundary>


                        </div>

                    </div>
                </div>
                :
                <RedirectComponent/>
            }
        </>


    );
}

export default Checkout;
