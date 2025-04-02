import { API_URL } from "@env";
import axios from "axios";

export class EntriesAPI {
  static ENTRIES_URL = `http://${API_URL}/entries`;

  static async getEntries() {
    try {
      const response = await axios.get(EntriesAPI.ENTRIES_URL);
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  static async deleteEntry(id: number) {
    try {
      await axios.delete(`${EntriesAPI.ENTRIES_URL}/${id}`);
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }
}
