import {useFeaturedBanners} from './utils/hooks/useFeaturedBanners';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    const {data, isLoading} = useFeaturedBanners();
    console.log(data, isLoading);

    return (
        <>
            <Navbar/>
            <Footer/>
        </>
    );
}

export default App;
