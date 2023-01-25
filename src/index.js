import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/reduxStore";
import {Provider} from "./context/StoreContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
export const rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App state={state}/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    );
}
rerenderEntireTree(store.getState())
store.subscribe(() => rerenderEntireTree(store.getState()))
// Redux не запипує при виклику функції rerenderEntireTree вхідний параметр state,
// тому ми передаємо анонімну функцію, а в середині неї вже rerenderEntireTree зі стейтом
// (а могли передати функцію як callback)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


