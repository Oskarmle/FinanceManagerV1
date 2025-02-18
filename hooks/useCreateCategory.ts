import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@env";
import { CategoryEntity } from "../category/CategoryEntity";

const CATEGORIES_URL = `${API_URL}/categories`;

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (newCategory: CategoryEntity) => {
      const response = await axios.post(CATEGORIES_URL, newCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Creating category failed", error);
    },
    onSuccess: () => {
      console.log("Category created successfully");
    },
  });
};
