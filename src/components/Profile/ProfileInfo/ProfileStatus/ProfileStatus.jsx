import React from "react";
import s from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
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
    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
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
