import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) userId = 2
        profileAPI.getProfileData(userId)
            .then(data => {
                this.props.setUserProfile(data)
            })
    }
    render() {
        return <Profile profile={this.props.profile}/>
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
    profile: state.profilePage.profile
})
export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))
