import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen.tsx";

function App() {
    return (
        <Router>
            <Header/>
            <main className="container mx-auto py-8">
                <Routes>
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/product/:id" element={<ProductScreen />}/>
                </Routes>
            </main>
            <Footer/>
        </Router>
    )
}

export default App
