import React, {createContext} from "react";

const StoreContext = createContext(null)

const Provider = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>)
}
const Consumer = (props) => {
    return (
        <StoreContext.Consumer>
            {props.children}
        </StoreContext.Consumer>
    )

}
