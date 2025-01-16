import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  entriesPerPage: number;
  onEntriesPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Adjusted type
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  entriesPerPage,
  onEntriesPerPageChange,
}) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <i
              className={`bi bi-caret-left-fill fs-3 ${
                currentPage === 1 ? "text-gray" : "text-primary"
              }`}
            ></i>
          </button>
        </li>
        {renderPagination()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <i
              className={`bi bi-caret-right-fill fs-3 ${
                currentPage === totalPages ? "text-gray" : "text-primary"
              }`}
            ></i>
          </button>
        </li>
      </ul>
      <div className="form-group m-2 justify-content-around d-flex">
        <select
          className="form-select form-select-sm border-1 border-primary border-opacity-25 mx-2 text-gray-800 d-none d-md-inline-block"
          style={{ width: "10rem" }}
          value={entriesPerPage}
          onChange={(e) => onEntriesPerPageChange(e)}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
    </nav>
  );
};

export default Pagination;