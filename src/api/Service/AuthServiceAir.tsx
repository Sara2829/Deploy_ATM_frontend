import axios from "axios";
import { LoginBasicInfo } from "../Model/AuthInterfaceWater";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AirService = {
  login: async (loginData: LoginBasicInfo): Promise<LoginBasicInfo> => {
    try {
      const response = await axios.post<LoginBasicInfo>(
        `http://ec2-51-20-51-60.eu-north-1.compute.amazonaws.com:8080/auth/login`,
        loginData
      );
      console.log("Air login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error during Air login:", error);
      throw error;
    }
  },
};
