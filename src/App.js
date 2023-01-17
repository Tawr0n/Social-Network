import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

function App() {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header/>
                <Navbar/>
                <Profile/>
            </div>
        </div>
    );
}

export default App;
