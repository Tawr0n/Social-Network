import React, {useEffect} from 'react';
import s from './Users.module.css'
import User from "./User/User";
import Preloader from "../UI/Preloader/Preloader";
import Pagination from "../UI/Pagination/Pagination";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/usersReducer";
import {
    getActivePage,
    getFollowingInProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/usersSelectors";
import {useAppDispatch, useAppSelector} from "../../redux/reduxStore";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";

type QueryParamsType = { term?: string, page?: string, friend?: string }
export const UsersPage: React.FC = () => {
    const users = useAppSelector(getUsers)
    const pageSize = useAppSelector(getPageSize)
    const totalUsersCount = useAppSelector(getTotalUsersCount)
    const activePage = useAppSelector(getActivePage)
    const isLoading = useAppSelector(getIsLoading)
    const filter = useAppSelector(getUsersFilter)
    const followingInProgress = useAppSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        const parsed = queryString.parse(location.search) as QueryParamsType

        let actualPage = activePage
        let actualFilter = filter
        if (parsed.page) actualPage = Number(parsed.page)
        if (parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (parsed.friend) {
            actualFilter = {
                ...actualFilter,
                friend: parsed.friend === 'null' ? null : parsed.friend === 'true'
            }
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])
    useEffect(() => {
        const query: QueryParamsType = {}
        if (filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (activePage !== 1) query.page = String(activePage)

        navigate({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, activePage])


    const onPageClick = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const followWrapper = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowWrapper = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <section className={s.users}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Pagination totalItemsCount={totalUsersCount} pageSize={pageSize}
                        activePage={activePage} onPageClick={onPageClick} portionSize={5}/>
            {isLoading
                ? <Preloader/>
                : users.map(u => <User key={u.id} user={u}
                                       follow={followWrapper} unfollow={unfollowWrapper}
                                       followingInProgress={followingInProgress}/>)

            }
        </section>
    )
}
