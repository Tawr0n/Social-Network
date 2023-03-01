import React from "react";
import s from './ProfileStatus.module.css'


type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status,
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={s.profile__status}>
                {this.state.editMode
                    ? <input onChange={this.onStatusChange} onBlur={this.deactivateEditMode}
                             className={s.status__input} type="text"
                             value={this.state.status} autoFocus={true}/>
                    :
                    <span onDoubleClick={this.activateEditMode}
                          className={s.status__text}>{this.props.status || 'Статус Тут'}</span>
                }
            </div>
        )
    }


}

export default ProfileStatus
