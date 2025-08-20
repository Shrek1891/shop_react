import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";

function App() {
    return (
        <>
            <Header/>
            <main className="container mx-auto py-8">
                <HomeScreen/>
            </main>
            <Footer/>
        </>
    )
}

export default App
