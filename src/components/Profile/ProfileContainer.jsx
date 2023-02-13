import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileData, getUserStatus, updateStatus} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfileData(userId)
        this.props.getUserStatus(userId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.props.getUserProfileData(this.props.authorizedUserId)
            this.props.getUserStatus(this.props.authorizedUserId)
        }
    }

    render() {
        return <Profile profile={this.props.profile} status={this.props.status}
                        updateStatus={this.props.updateStatus}/>
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = state => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id
})
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        getUserProfileData, getUserStatus, updateStatus
    }),
    withRouter
)(ProfileContainer)
