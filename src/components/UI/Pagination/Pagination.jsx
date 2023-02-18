import React from 'react';
import s from './Pagination.module.css'


const Pagination = ({totalUsersCount, pageSize, activePage, onPageClick}) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let currentPage = activePage
    let slicedPages
    if (currentPage < 3) {
        slicedPages = pages.slice(0, 5)
    } else if (pagesCount - currentPage < 3) {
        slicedPages = pages.slice(pagesCount - 5, pagesCount)
    } else {
        slicedPages = pages.slice(currentPage - 3, currentPage + 2)
    }

    return (
        <div className={s.pagination}>
            {
                slicedPages.map(p => <span onClick={() => onPageClick(p)}
                                           className={activePage === p
                                               ? `${s.pageNumber_selected} ${s.pageNumber}`
                                               : s.pageNumber} key={p}>{p}</span>)
            }
        </div>
    )
}
export default Pagination;
