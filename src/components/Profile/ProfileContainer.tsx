import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileData,
    getUserStatus,
    updateImage,
    updateProfile,
    updateStatus
} from "../../redux/profileReducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../types/types";

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
}
type MapDispatchPropsType = {
    getUserProfileData: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updateImage: (file: File) => void
    updateProfile: (profile: ProfileType) => Promise<void>
}
type OwnPropsType = {}
type WithRouterProps = {
    router: {
        location: ReturnType<typeof useLocation>
        navigate: ReturnType<typeof useNavigate>
        params: Record<string, string>
    }
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & WithRouterProps
type StateType = {}

class ProfileContainer extends React.Component<PropsType, StateType> {
    refreshProfile = (userId: number | null) => {
        if (userId) {
            this.props.getUserProfileData(userId)
            this.props.getUserStatus(userId)
        } else {
            console.error('Id must exists in URI params or in state (\'authorizedUserId\')')
        }
    }

    componentDidMount() {
        let userId: number | null = +this.props.router.params.userId
        if (!userId) userId = this.props.authorizedUserId

        this.refreshProfile(userId)
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile(this.props.authorizedUserId)
        }
    }

    render() {
        if (!this.props.router.params.userId && !this.props.authorizedUserId) {
            return <Navigate to={'/login'}/>
        }
        return <Profile profile={this.props.profile} status={this.props.status}
                        isOwner={!this.props.router.params.userId}
                        updateStatus={this.props.updateStatus}
                        updateImage={this.props.updateImage}
                        updateProfile={this.props.updateProfile}/>
    }
}


function withRouter<Props extends WithRouterProps>(Component: React.ComponentType<Props>) {
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props as Props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id
})
//<React.Component<PropsType>> або просто <PropsType>
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileData, getUserStatus, updateStatus, updateImage, updateProfile
    }),
    withRouter
)(ProfileContainer)
