"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductsQuery } from "@/services/product/useProduct";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { columns } from "./table/columns";
import { SearchBar } from "./table/SearchBar";
import { TableView } from "./table/TableView";
import { Pagination } from "./table/Pagination";
import { LoadingSpinner } from "../ui/loading-spinner";
import { AddProductModal } from "./table/AddProductModal";
import { Button } from "../ui/button";

interface ProductTableProps {
  initialPage?: number;
  initialLimit?: number;
}

export function ProductTable({
  initialPage = 1,
  initialLimit = 10,
}: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("s") || "");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 });

  const [pagination, setPagination] = useState({
    pageIndex: Math.max(
      0,
      (Number(searchParams.get("page")) || initialPage) - 1
    ),
    pageSize: Number(searchParams.get("limit")) || initialLimit,
  });

  const { data, isLoading, isFetching } = useProductsQuery(
    pagination.pageIndex + 1,
    pagination.pageSize,
    debouncedSearchTerm,
    sorting[0]?.id ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined
  );

  const table = useReactTable({
    data: data?.entries || [],
    columns,
    pageCount: data?.page_info
      ? Math.ceil(data.page_info.total_row / pagination.pageSize)
      : 1,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set("s", debouncedSearchTerm);
    if (pagination.pageIndex > 0) {
      params.set("page", String(pagination.pageIndex + 1));
    }
    if (pagination.pageSize !== 10) {
      params.set("limit", String(pagination.pageSize));
    }
    if (sorting.length > 0) {
      const sort = `${sorting[0].desc ? "-" : ""}${sorting[0].id}`;
      params.set("sort_by", sort);
    }

    router.replace(`?${params.toString()}`);
  }, [
    debouncedSearchTerm,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    router,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClear={handleClearSearch}
        />
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="rounded-md border border-gray-800 overflow-hidden">
        <TableView table={table} />
      </div>

      {data?.page_info && (
        <Pagination table={table} totalItems={data.page_info.total_row} />
      )}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
