import {connect} from "react-redux";
import Users from "./Users";
import {follow, getUsersOnClick, requestUsers, unfollow} from "../../redux/usersReducer";
import React from "react";
import {
    getActivePage, getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.activePage, this.props.pageSize, this.props.users)
    }

    onPageClick = (pageNumber) => {
        this.props.getUsersOnClick(pageNumber, this.props.pageSize)
    }

    render() {
        return <Users users={this.props.users} activePage={this.props.activePage}
                      totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                      isLoading={this.props.isLoading}
                      follow={this.props.follow} unfollow={this.props.unfollow}
                      followingInProgress={this.props.followingInProgress}
                      onPageClick={this.onPageClick}/>
    }
}


const mapStateToProps = (state) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    activePage: getActivePage(state),
    isLoading: getIsLoading(state),
    followingInProgress: getFollowingInProgress(state),
})

export default connect(mapStateToProps, {
    requestUsers,
    getUsersOnClick,
    follow,
    unfollow
})(UsersContainer)
