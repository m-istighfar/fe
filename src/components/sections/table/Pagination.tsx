import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

const PAGE_SIZES = [10, 20, 30, 50, 100];

interface PaginationProps<TData> {
  table: Table<TData>;
  totalItems: number;
}

export function Pagination<TData>({
  table,
  totalItems,
}: PaginationProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">
          Showing {table.getRowModel().rows.length} of {totalItems} items
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
          >
            {pageSize} per page
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 z-10 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg bottom-full mb-1">
              {PAGE_SIZES.map((size) => (
                <button
                  key={size}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    pageSize === size
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    table.setPageSize(size);
                    setIsOpen(false);
                  }}
                >
                  {size} per page
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
            let pageIndex;
            const currentPage = table.getState().pagination.pageIndex;
            const pageCount = table.getPageCount();

            if (pageCount <= 5) {
              pageIndex = i;
            } else if (currentPage <= 1) {
              pageIndex = i;
            } else if (currentPage >= pageCount - 2) {
              pageIndex = pageCount - 5 + i;
            } else {
              pageIndex = currentPage - 2 + i;
            }

            if (pageIndex < 0) pageIndex = 0;
            if (pageIndex >= pageCount) return null;

            return (
              <button
                key={pageIndex}
                onClick={() => table.setPageIndex(pageIndex)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  currentPage === pageIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {pageIndex + 1}
              </button>
            );
          }).filter(Boolean)}
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
