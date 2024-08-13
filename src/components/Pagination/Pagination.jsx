import React, { useState } from 'react';
import './Pagination.css';
import Loading from '../Loading/Loading';
import { Form } from 'react-bootstrap';
export const Pagination = ({
  sortOrder,
  handleSortChange,
  currentPage,
  totalPages,
  onPageChange,
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Form.Group
          controlId="categoryFilter"
          className="mb-2 mt-4 w-25 d-flex justify-content-center"
        >
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group
          controlId="sortOrder"
          className="mb-2 ms-5 mt-4 w-25 d-flex justify-content-center"
        >
          <Form.Label>Sort Order</Form.Label>
          <Form.Control
            as="select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Control>
        </Form.Group>
      </div>

      {/* <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-link"
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              <button
                onClick={() => onPageChange(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-link"
            >
              Next
            </button>
          </li>
        </ul>
      </nav> */}
    </>
  );
};
