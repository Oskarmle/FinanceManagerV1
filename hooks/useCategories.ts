import { useEffect, useState } from "react";
import { CategoriesAPI } from "../APIs/CategoryAPI";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();

      const categories = response.map(
        (category: { category: string; id: number }) => ({
          label: category.category,
          value: category.id,
        })
      );
      setCategories(categories);
      // console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories;
};
