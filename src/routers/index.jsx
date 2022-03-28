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
import CartContext from "../contexts/CartContext";
import {CartReducer} from "../contexts/CartReducer";
import {useReducer} from "react";

function AppRouter() {
    const [state, dispatch] = useReducer(CartReducer, {
        products: [],
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
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </CartContext.Provider>
        </Router>
    );
}

export default AppRouter;