import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";

function App() {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header/>
                <Navbar/>
                <main className={'content'}>
                    {/*<Profile/>*/}
                    <Messages/>
                </main>

            </div>
        </div>
    );
}

export default App;
