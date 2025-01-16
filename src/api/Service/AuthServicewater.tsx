import axios from "axios";
import { LoginBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthService = {
  login: async (loginData: LoginBasicInfo): Promise<LoginBasicInfo> => {
    try {
      const response = await axios.post<LoginBasicInfo>(
        `${API_URL}/api/v1/user/login`,
        loginData
      );
      return response.data; // Return the entire login data (email, password, etc.)=
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Rethrow the error to be handled in the component
    }
  },
};
