import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileData} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getUserProfileData(this.props.router.params.userId)
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
export default connect(mapStateToProps, {getUserProfileData})(withRouter(ProfileContainer))
