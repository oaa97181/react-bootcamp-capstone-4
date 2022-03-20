import {useFeaturedBanners} from './utils/hooks/useFeaturedBanners';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";


function App() {
    const {data, isLoading} = useFeaturedBanners();
    console.log(data, isLoading);

    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path='/products' component={ProductList}/>
                <Route path="/home" component={Homepage}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;