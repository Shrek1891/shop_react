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
import ShippingScreen from "./screens/SchippingScreen.tsx";
import PaymentScreen from "./screens/PaymentScreen.tsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.tsx";
import OrderScreen from "./screens/OrderScreen.tsx";


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
                        <Route path="/shipping" element={<ShippingScreen/>}/>
                        <Route path="/payment" element={<PaymentScreen/>}/>
                        <Route path="/confirm" element={<PlaceOrderScreen/>}/>
                        <Route path="/order/:id" element={<OrderScreen/>}/>
                        <Route path="/order/:id/pay" element={<OrderScreen/>}/>
                    </Routes>
                </main>
                <Footer/>
            </Router>
        </Provider>
    )
}

export default App
