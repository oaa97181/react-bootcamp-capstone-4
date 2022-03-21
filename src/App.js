import Navbar from "./components/ReusableComponents/Navbar";
import Footer from "./components/ReusableComponents/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";


function App() {

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/home" component={Homepage}/>
                <Route path='/products' component={ProductList}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;