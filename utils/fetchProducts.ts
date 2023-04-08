export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  return await res.json();
};
