import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen.tsx";
import {Provider} from "react-redux";
import CartScreen from "./screens/CartScreen.tsx";
import {store} from "./store/store.ts";
import LoginScreen from "./screens/LoginScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <main className="container mx-auto py-2 h-screen">
                    <Routes>
                        <Route path="/" element={<HomeScreen/>}/>
                        <Route path="/product/:id" element={<ProductScreen/>}/>
                        <Route path="/cart/:id?" element={<CartScreen/>}/>
                        <Route path="/login" element={<LoginScreen/>}/>
                        <Route path="/register" element={<RegisterScreen/>}/>
                        <Route path="/profile/:id?" element={<ProfileScreen/>}/>
                    </Routes>
                </main>
                <Footer/>
            </Router>
        </Provider>
    )
}

export default App
