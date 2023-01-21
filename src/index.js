import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const posts = [
    {id: 1, message: 'Слизерин', likesCount: 41},
    {id: 2, message: 'Рейвенклов', likesCount: 59},
]
const dialogs = [
    {id: 1, name: 'Албус', text: 'Прибуду о 20:00 у суботу'},
    {id: 2, name: 'Северус', text: 'І не забудь.'},
    {id: 3, name: 'Рон', text: 'Як життя, старий?'},
]
const messages = [
    {id: 1, message: 'Експеліармус'},
    {id: 2, message: 'Акціо'},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App posts={posts} dialogs={dialogs} messages={messages}/>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
