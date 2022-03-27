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


function AppRouter() {

    return (
        <Router>
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
        </Router>
    );
}

export default AppRouter;