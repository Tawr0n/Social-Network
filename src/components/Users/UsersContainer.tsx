import {connect} from "react-redux";
import Users from "./Users";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/usersReducer";
import React from "react";
import {
    getActivePage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter,
} from "../../redux/usersSelectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";


type MapStatePropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    activePage: number
    isLoading: boolean
    followingInProgress: Array<number>
    filter: FilterType
}
type MapDispatchPropsType = {
    requestUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.activePage, this.props.pageSize, this.props.filter)
    }

    onPageClick = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter)
    }

    render() {
        return <Users users={this.props.users} activePage={this.props.activePage}
                      totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                      isLoading={this.props.isLoading}
                      follow={this.props.follow} unfollow={this.props.unfollow}
                      followingInProgress={this.props.followingInProgress}
                      onPageClick={this.onPageClick}
                      onFilterChanged={this.onFilterChanged}/>
    }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    activePage: getActivePage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestUsers,
    follow,
    unfollow
})(UsersContainer)
