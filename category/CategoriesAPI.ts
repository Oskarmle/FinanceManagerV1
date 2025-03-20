import { API_URL } from "@env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export class CategoriesAPI {
  static getCategories = async () => {
    const mutation = useMutation<unknown, Error>({
      mutationFn: (newCategory) => {
        return axios.post(`http://${API_URL}/categories`, newCategory, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      onError: (error) => {
        console.error("Creating category failed", error);
      },
      onSuccess: () => {
        console.log("Category created successfully");
      },
    });
  };
}
