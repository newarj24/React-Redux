import React from 'react';
import propTypes from 'prop-types';

function Pagination({
  courseLength,
  coursesPerPage,
  currentPage,
  handlePagination
}) {
  const pageList = [];

  const pages =
    courseLength % coursesPerPage === 0
      ? courseLength / coursesPerPage
      : courseLength / coursesPerPage + 1;

  for (let idx = 1; idx <= pages; idx++) {
    pageList.push(idx);
  }

  return (
    <ul className="pagination justify-content-center mt-5">
      {pageList.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePagination(page)}
        >
          <a className="page-link" href="#">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  courseLength: propTypes.number.isRequired,
  coursesPerPage: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  handlePagination: propTypes.func.isRequired
};

export default Pagination;
