"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { ProductPayload, productSchema } from "@/validations/product";
import { useCreateProductMutation } from "@/services/product/useProduct";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const { mutate: createProduct, isPending } = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = (data: ProductPayload) => {
    createProduct(
      { ...data, price: Number(data.price), stock: Number(data.stock) },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-white">Add New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Product Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price"
              min="1"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-400">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter stock"
              min="0"
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-400">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-lg hover:bg-gray-700"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-800"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
