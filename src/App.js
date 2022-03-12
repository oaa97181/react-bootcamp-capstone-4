import {useFeaturedBanners} from './utils/hooks/useFeaturedBanners';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";

function App() {
    const {data, isLoading} = useFeaturedBanners();
    console.log(data, isLoading);

    return (
        <>
            <Navbar/>
            <Homepage/>
            <Footer/>
        </>
    );
}

export default App;
