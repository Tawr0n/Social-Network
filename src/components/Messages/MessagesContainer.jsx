import {sendMessage, updateNewMessageText} from "../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        sendMessage,
        updateNewMessageText
    })
)(Messages);
