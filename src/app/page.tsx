import { ProductTable } from "@/components/sections/ProductTable";
import { prefetchProducts } from "@/services/product/useProduct";
import { HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function ProductPage() {
  const initialState = {
    page: 1,
    limit: 10,
  };

  const dehydratedState = await prefetchProducts(
    initialState.page,
    initialState.limit
  );

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Product List</h1>
          <p className="text-gray-400">Find the best products for your needs</p>
        </header>

        <div className="bg-gray-900 rounded-lg shadow-md">
          <HydrationBoundary state={dehydratedState}>
            <ProductTable
              initialPage={initialState.page}
              initialLimit={initialState.limit}
            />
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
