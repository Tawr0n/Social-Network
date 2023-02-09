import React from "react";
import s from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        text: 'Heh',
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = (event) => {
        this.setState({
            editMode: false,
            text: event.target.value
        })
    }
    onChangeStatus = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <div className={s.profile__status}>
                {this.state.editMode
                    ? <input onChange={this.onChangeStatus} onBlur={this.deactivateEditMode}
                             className={s.status__input} type="text"
                             value={this.state.text} autoFocus={true}/>
                    :
                    <span onDoubleClick={this.activateEditMode} className={s.status__text}>{this.state.text}</span>
                }
            </div>
        )
    }


}

export default ProfileStatus
