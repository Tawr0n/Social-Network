import {connect} from "react-redux";
import Users from "./Users";
import {followToggleAC, setActivePageAC, setTotalUsersCountAC, setUsersAC} from "../../redux/usersReducer";

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
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer
