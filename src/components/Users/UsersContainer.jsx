import {connect} from "react-redux";
import Users from "./Users";
import {
    followingInProgressToggle,
    followToggle,
    loadingToggle,
    setActivePage,
    setTotalUsersCount,
    setUsers
} from "../../redux/usersReducer";
import React from "react";
import {usersAPI} from "../../api/api";


class UsersContainer extends React.Component {

    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.loadingToggle(true)

            usersAPI.getUsers(this.props.activePage, this.props.pageSize)
                .then(data => {
                    this.props.setUsers(data.items)
                    this.props.setTotalUsersCount(data.totalCount)
                    this.props.loadingToggle(false)
                })
        }
    }

    onPageClick = (pageNumber) => {
        this.props.setActivePage(pageNumber)
        this.props.loadingToggle(true)

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.setUsers(data.items)
                this.props.loadingToggle(false)
            })
    }

    render() {
        return <Users users={this.props.users} activePage={this.props.activePage}
                      totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                      isLoading={this.props.isLoading} followingInProgress={this.props.followingInProgress}
                      followToggle={this.props.followToggle} onPageClick={this.onPageClick}
                      followingInProgressToggle={this.props.followingInProgressToggle}/>
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
/*const mapDispatchToProps = (dispatch) => ({
    followToggle: (userId) => {
        dispatch(followToggleAC(userId))
    },
    setUsers: users => {
        dispatch(setUsersAC(users))
    },
    setActivePage: pageNumber => {
        dispatch(setActivePageAC(pageNumber))
    },
    setTotalUsersCount: totalUsersCount => {
        dispatch(setTotalUsersCountAC(totalUsersCount))
    },
    loadingToggle: isLoading => {
        dispatch(loadingToggleAC(isLoading))
    }
})*/
export default connect(mapStateToProps, {
    followToggle,
    setUsers,
    setActivePage,
    setTotalUsersCount,
    loadingToggle,
    followingInProgressToggle
})(UsersContainer)
