import {connect} from "react-redux";
import Users from "./Users";
import {follow, getUsers, getUsersOnClick, unfollow} from "../../redux/usersReducer";
import React from "react";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.activePage, this.props.pageSize, this.props.users)
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
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    activePage: state.usersPage.activePage,
    isLoading: state.usersPage.isLoading,
    followingInProgress: state.usersPage.followingInProgress,
})

export default connect(mapStateToProps, {
    getUsers,
    getUsersOnClick,
    follow,
    unfollow
})(UsersContainer)
