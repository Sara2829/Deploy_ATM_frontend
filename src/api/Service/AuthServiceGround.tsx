import axios from "axios";
import { LoginBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;
axios.defaults.withCredentials = true;

export const GroundService = {
  login: async (loginData: LoginBasicInfo): Promise<LoginBasicInfo> => {
    try {
      const response = await axios.post<LoginBasicInfo>(
        `${API_URL}/login`,
        loginData
      );
      return response.data;
    } catch (error) {
      console.error("Error during Ground login:", error);
      throw error;
    }
  },
};
