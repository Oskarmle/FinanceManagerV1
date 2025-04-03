import { API_URL } from "@env";
import axios from "axios";
import { UserEntity } from "../user/UserEntity";
import * as SecureStore from "expo-secure-store";

export class UsersAPI {
  static async createUser(user: UserEntity) {
    const response = await axios.post(`http://${API_URL}/auth/signup`, user);
    const data = response.data;
    return data;
  }

  static async signinUser(user: UserEntity) {
    const response = await axios.post(`http://${API_URL}/auth/signin`, user);
    const data = response.data;
    return data;
  }

  static async getUser() {
    const token = await SecureStore.getItemAsync("jwt");

    const response = await axios.get(`http://${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token ? JSON.parse(token).access_token : ""}`,
      },
    });
    const data = response.data;
    return data;
  }
}
