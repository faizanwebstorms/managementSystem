import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // Replace with your API base URL

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/v1/auth/login`,
      credentials
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

export const signupApi = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/v1/auth/register`, data);
    console.log("response", response?.data?.data?.user);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};
