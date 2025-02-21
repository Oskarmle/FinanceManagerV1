import { API_URL } from "@env";
import axios from "axios";

export class CategoriesAPI {
  static CATEGORIES_URL = `http://${API_URL}/categories`;

  static async getCategories() {
    try {
      const response = await axios.get(CategoriesAPI.CATEGORIES_URL);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  static async deleteCategory(id: number) {
    try {
      await axios.delete(`${CategoriesAPI.CATEGORIES_URL}/${id}`);
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }
}
