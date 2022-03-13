import {useFeaturedBanners} from './utils/hooks/useFeaturedBanners';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {PageProvider} from "./contexts/pageContext";
import Page from "./pages";

function App() {
    const {data, isLoading} = useFeaturedBanners();
    console.log(data, isLoading);

    return (
        <PageProvider>
            <Navbar/>
            <Page/>
            <Footer/>
        </PageProvider>
    );
}

export default App;
