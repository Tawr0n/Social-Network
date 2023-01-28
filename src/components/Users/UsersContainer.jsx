import {connect} from "react-redux";
import Users from "./Users";
import {followToggleAC, setUsersAC} from "../../redux/usersReducer";

const mapStateToProps = (state) => ({
    users: state.usersPage.users
})
const mapDispatchToProps = (dispatch) => ({
    followToggle: (userId) => {
        dispatch(followToggleAC(userId))
    },
    setUsers: users => {
        dispatch(setUsersAC(users))
    }
})
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer
