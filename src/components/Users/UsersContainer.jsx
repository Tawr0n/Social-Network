import {connect} from "react-redux";
import Users from "./Users";
import {followToggleAC, setActivePageAC, setTotalUsersCountAC, setUsersAC} from "../../redux/usersReducer";
import React from "react";
import axios from "axios";


class UsersContainer extends React.Component {

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
        }
    }

    onPageClick = (pageNumber) => {
        this.props.setActivePage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users users={this.props.users} activePage={this.props.activePage}
                      totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                      followToggle={this.props.followToggle} onPageClick={this.onPageClick}/>
    }
}


const mapStateToProps = (state) => ({
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    activePage: state.usersPage.activePage
})
const mapDispatchToProps = (dispatch) => ({
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
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
