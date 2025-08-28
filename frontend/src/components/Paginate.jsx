
import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null;

  const getPageUrl = (pageNum) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNum}`;
    }
    if (keyword) {
      return `/search/${keyword}/page/${pageNum}`;
    }
    return `/page/${pageNum}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 7;
    
    if (pages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (page <= 4) {
        // Near start
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(pages);
      } else if (page >= pages - 3) {
        // Near end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = pages - 4; i <= pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(pages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="flex justify-center mt-12">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous Button */}
        {page > 1 && (
          <Link
            to={getPageUrl(page - 1)}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Previous</span>
          </Link>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                ...
              </span>
            ) : (
              <Link
                to={getPageUrl(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors ${
                  pageNum === page
                    ? 'z-10 bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </Link>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        {page < pages && (
          <Link
            to={getPageUrl(page + 1)}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Next</span>
          </Link>
        )}
      </nav>

      {/* Page Info */}
      <div className="ml-6 flex items-center text-sm text-gray-700">
        <span>
          Page {page} of {pages}
        </span>
        {pages > 1 && (
          <span className="ml-2 text-gray-500">
            ({pages} total pages)
          </span>
        )}
      </div>
    </div>
  );
};

export default Paginate;
