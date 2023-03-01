import {sendMessage} from "../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {DialogType, MessageType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";


type TStateProps = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}
type TDispatchProps = {
    sendMessage: (newMessageText: string) => void
}
type TOwnProps = {}
export type MessagesPropsType = TStateProps & TDispatchProps & TOwnProps
const mapStateToProps = (state: AppStateType): TStateProps => ({
    messages: state.messagesPage.messages,
    dialogs: state.messagesPage.dialogs
})

export default compose(
    withAuthRedirect,
    connect<TStateProps, TDispatchProps, TOwnProps, AppStateType>(mapStateToProps, {
        sendMessage,
    })
)(Messages);
