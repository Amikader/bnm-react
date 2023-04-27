import React from 'react'
import ReactPaginate from 'react-paginate'
import {styles} from '../css/Demand.css'


const PaginationDemands = ({totalPages,setPage}) => {
    const classes = styles()

    const handlePageClick = (data)=>{
        setPage(data.selected+1)
    }
    return (
        <div className={classes.pagination}>
            <ReactPaginate
                className={classes.pages}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                pageCount={totalPages}
                pageClassName={classes.page}
                previousLabel="<"
                previousLinkClassName={classes.page}
                breakLabel="..."
                breakClassName={classes.page}
                nextLabel=">"
                nextClassName={classes.page}
                activeClassName={classes.active}
            />
        </div>
    )
}

export default PaginationDemands