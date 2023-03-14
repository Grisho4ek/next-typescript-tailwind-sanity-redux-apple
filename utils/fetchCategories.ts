export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  return await res.json();
};
