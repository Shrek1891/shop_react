import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <main className="container mx-auto py-8 min-h-screen">
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="/product/:id" element={<ProductScreen/>}/>
                    </Routes>
                </main>
                <Footer/>
            </Router>
        </Provider>
    )
}

export default App
