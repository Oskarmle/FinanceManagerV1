import { API_URL } from "@env";
import axios from "axios";

export class CategoriesAPI {
  static CATEGORIES_URL = `http://${API_URL}/categories`;

  static async getCategories() {
    const response = await axios.get(CategoriesAPI.CATEGORIES_URL);
    return response.data;
  }
}
