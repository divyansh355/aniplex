const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => (
  <div className="flex justify-center mt-4 space-x-4">
    <button
      onClick={onPrevious}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
    >
      Previous
    </button>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Next
    </button>
  </div>
);

export default Pagination;
