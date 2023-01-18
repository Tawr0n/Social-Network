import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Messages from "./components/Messages/Messages";
import {Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

function App() {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header/>
                <Navbar/>
                <main className={'content'}>
                    <Routes>
                        <Route path={'/*'} element={<Profile/>}/>
                        <Route path={'/messages'} element={<Messages/>}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                    </Routes>
                </main>

            </div>
        </div>
    );
}

export default App;
