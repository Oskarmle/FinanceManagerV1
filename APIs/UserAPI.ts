import { API_URL } from "@env";
import axios from "axios";
import { UserEntity } from "../user/UserEntity";

export class UsersAPI {
  static async createUser(user: UserEntity) {
    const response = await axios.post(`http://${API_URL}/auth/signup`, user);
    const data = response.data;
    return data;
  }

  static async signinUser(user: UserEntity) {
    const response = await axios.post(`http://${API_URL}/auth/signup`, user);
    const data = response.data;
    return data;
  }
}
