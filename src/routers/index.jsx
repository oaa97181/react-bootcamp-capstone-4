import Navbar from "../components/ReusableComponents/Navbar";
import Footer from "../components/ReusableComponents/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import CartContext from "../contexts/CartContext";
import {CartReducer} from "../contexts/CartReducer";
import {useReducer} from "react";

function AppRouter() {
    
    let prod1 = {

        singleProduct: {
            category: {
                id: 'YWHyYRIAACgAykCq',
                type: 'category',
                lang: 'en-us',
                slug: 'decorate',
            },
            mainimage: {
                url:
                    "https://images.prismic.io/wizeline-academy/1c8883ca-" +
                    "2797-4138-a7e5-a7d2ae583192_1.jpeg?auto=compress,format",
            },
            name: "Fair Isle Snowflake Lumbar Cushion Cover",
            price: 40,
            sku: "1107982309",
            stock: 48,
        },
        units: `1`,
    }
    let prod2 = {
        singleProduct: {
            category: {
                id: 'testid',
                type: 'category',
                lang: 'en-us',
                slug: 'decorate',
            },
            mainimage: {
                url:
                    "https://images.prismic.io/wizeline-academy/1c8883ca-" +
                    "2797-4138-a7e5-a7d2ae583192_1.jpeg?auto=compress,format",
            },
            name: "testname",
            price: 99,
            sku: "testSKU",
            stock: 99,
        },
        units: `1`,
    }

    const [state, dispatch] = useReducer(CartReducer, {
        products: window.location.hostname.includes('localhost')?[prod1, prod2]:[],
    });

    return (
        <Router>
            <CartContext.Provider value={{state, dispatch}}>
                <Navbar/>
                <Switch>
                    <Route path="/home" component={Homepage}/>
                    <Route path='/products' component={ProductList}/>
                    <Route path='/product/:productId' component={ProductDetail}/>
                    <Route path='/search' component={ProductList}/>
                    <Route path='/cart' component={CartPage}/>
                    <Route path='/checkout' component={CheckoutPage}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </CartContext.Provider>
        </Router>
    );
}

export default AppRouter;