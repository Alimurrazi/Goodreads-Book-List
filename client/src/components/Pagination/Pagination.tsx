import ReactPaginate from 'react-paginate';
import './Pagination.css';
import * as React from 'react';

interface ISelected {
  selected: number;
}

function Pagination({ setCurrentPage }: { setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) {
  const pageCount = 4;

  const handlePageClick = (event: ISelected) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
    </div>
  );
}

export default Pagination;
