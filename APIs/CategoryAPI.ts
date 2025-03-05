import { API_URL } from "@env";
import axios from "axios";
import { CategoryEntity } from "../category/CategoryEntity";

export class CategoriesAPI {
  static CATEGORIES_URL = `http://${API_URL}/categories`;

  static async getCategories() {
    console.log(CategoriesAPI.CATEGORIES_URL);
    
    try {
      const response = await axios.get<CategoryEntity[]>(
        CategoriesAPI.CATEGORIES_URL
      );
      console.log("API Request Response:", response);
      
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  static async createCategory(category: CategoryEntity) {
    const response = await axios.post(CategoriesAPI.CATEGORIES_URL, category);
    const data = response.data;
    return data;
  }
}
