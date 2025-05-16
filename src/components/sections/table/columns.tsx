import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors w-full text-left"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: (info) => (
      <div className="font-medium text-white">{info.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: (info) => {
      const price = info.getValue() as string;
      return (
        <div className="font-mono text-amber-400">
          {Number(price).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: (info) => {
      const stock = info.getValue() as number;
      return <div className="text-white">{stock}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors w-full text-left"
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: (info) => {
      const createdAt = info.getValue() as string;
      return (
        <div className="text-gray-400">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
];
