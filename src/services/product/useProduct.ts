import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetcher, sendData } from "../api/fetcher";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { serverFetcher } from "../api/server-fetcher";
import { Product } from "@/types/product";
import { ApiResponse, DataPaginate } from "@/types/interface";
import { DataObject } from "@/types/types";
import { ProductPayload } from "@/validations/product";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<DataObject<Product>>, Error, ProductPayload>({
    mutationFn: (data) => sendData("products", data, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
    },
  });
};

export const useProductsQuery = (
  page = 1,
  limit = 10,
  s?: string,
  sort_by?: string
) => {
  return useQuery<
    ApiResponse<DataPaginate<Product>>,
    Error,
    DataPaginate<Product>
  >({
    queryKey: ["products", { page, limit, s, sort_by }],
    queryFn: () =>
      fetcher(
        `products?page=${page}&limit=${limit}${s ? `&s=${s}` : ""}${
          sort_by ? `&sort_by=${sort_by}` : ""
        }`
      ),
    select: (response) => response.data,
    placeholderData: keepPreviousData,
  });
};

export async function getProducts(page = 1, limit = 10) {
  try {
    const response = await serverFetcher(
      `products?page=${page}&limit=${limit}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
}

export async function prefetchProducts(page = 1, limit = 10) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", { page, limit, s: "", sort_by: "" }],
    queryFn: () => getProducts(page, limit),
  });

  return dehydrate(queryClient);
}
