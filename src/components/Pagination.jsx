export default function Pagination ({ page, pages, onPageChange }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  let end = Math.min(pages, start + maxPagesToShow - 1);

  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {page > 1 && (
        <button
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded bg-white"
        >
          Prev
        </button>
      )}

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 border rounded">
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded ${
            page === num ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          {num}
        </button>
      ))}

      {end < pages && (
        <>
          {end < pages - 1 && <span className="px-2">...</span>}
          <button onClick={() => onPageChange(pages)} className="px-3 py-1 border rounded">
            {pages}
          </button>
        </>
      )}

      {page < pages && (
        <button
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded bg-white"
        >
          Next
        </button>
      )}
    </div>
  );
};
