import React from 'react';
import s from './Pagination.module.css'
import classNames from "classnames";


const Pagination = ({totalItemsCount, pageSize, activePage = 1, onPageClick, portionSize = 5}) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let slicedPages
    if (activePage < Math.floor(portionSize / 2) + 1) {
        slicedPages = pages.slice(0, portionSize)
    } else if (pagesCount - activePage < Math.ceil(portionSize / 2)) {
        slicedPages = pages.slice(pagesCount - portionSize, pagesCount)
    } else {
        slicedPages = pages.slice(activePage - Math.floor(portionSize / 2) - 1, activePage + Math.ceil(portionSize / 2) - 1)
    }

    return (
        <div className={s.pagination}>

            <button onClick={() => onPageClick(activePage - 1)}
                    className={classNames({[s.arrowButton_hidden]: activePage === 1}, s.arrowButton)}>
                <i className={`${s.arrow} ${s.arrow_left}`}></i>
            </button>
            {
                slicedPages.map(p => <span onClick={() => onPageClick(p)}
                                           className={classNames(s.pageNumber, {
                                               [s.pageNumber_selected]: activePage === p
                                           })} key={p}>{p}</span>)
            }
            <button onClick={() => onPageClick(activePage + 1)}
                    className={classNames({[s.arrowButton_hidden]: activePage === pagesCount}, s.arrowButton)}>
                <i className={`${s.arrow} ${s.arrow_right}`}></i>
            </button>
        </div>
    )
}
export default Pagination;
