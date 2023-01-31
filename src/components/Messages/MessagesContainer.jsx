import {sendMessage, updateNewMessageText} from "../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    messages: state.messagesPage.messages,
    dialogs: state.messagesPage.dialogs,
    newMessageText: state.messagesPage.newMessageText,
})
/*const mapDispatchToProps = (dispatch) => ({
    sendMessage: () => {
        dispatch(sendMessageAC())
    },
    updateNewMessageText: (message) => {
        dispatch(updateNewMessageTextAC(message))
    }
})*/

const MessagesContainer = connect(mapStateToProps, {sendMessage,updateNewMessageText})(Messages)


export default MessagesContainer;
