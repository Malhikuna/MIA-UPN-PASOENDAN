import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  getPageNumbers: () => (number | string)[];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  getPageNumbers,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-primary-content hover:text-white"
        }`}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1 md:gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[28px] md:min-w-[32px] h-[28px] md:h-[32px] rounded-lg text-xs md:text-sm font-semibold transition-colors ${
              page === currentPage
                ? "bg-primary-content text-white"
                : page === '...'
                ? "bg-transparent text-gray-400 cursor-default"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 rounded-lg font-semibold transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-primary-content hover:text-white"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
}