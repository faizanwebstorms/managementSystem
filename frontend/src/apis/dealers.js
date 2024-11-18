import axios from "axios";
const API_BASE_URL = "http://localhost:4000"; // Replace with your API base URL
export const dealersListingApi = async (
  page,
  limit,
  authToken
  // searchTerm
) => {
  try {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page); // Add pagination page
    if (limit) queryParams.append("limit", limit); // Add pagination limit
    // if (vendorId) queryParams.append("vendorId", vendorId); // Add pagination limit
    // if (searchTerm) queryParams.append("bookingNumber", searchTerm); // Add pagination limit
    const response = await axios.get(
      `${API_BASE_URL}/v1/users/dealers/all?${queryParams.toString()}`,
      { headers }
    );
    console.log("response bookings", response);
    // Check if the response contains data
    if (response.data) {
      console.log("Response Data: vendor gears", response.data);
      return response.data;
    } else {
      // If the response doesn't contain data, consider it an error
      throw new Error("Empty response data");
    }
  } catch (error) {
    // Log the entire error object for debugging purposes
    console.error("API Error:", error);

    // Return an error object or message to handle in your application
    return error.response.data;
  }
};

export const addDealerApi = async (
  data,
  authToken
  // searchTerm
) => {
  try {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axios.post(
      `${API_BASE_URL}/v1/users/dealer/add`,
      data,
      { headers }
    );
    console.log("response bookings", response);
    // Check if the response contains data
    if (response.data) {
      console.log("Response Data: vendor gears", response.data);
      return response.data;
    } else {
      // If the response doesn't contain data, consider it an error
      throw new Error("Empty response data");
    }
  } catch (error) {
    // Log the entire error object for debugging purposes
    console.error("API Error:", error);

    // Return an error object or message to handle in your application
    return error.response.data;
  }
};

export const deleteDealerApi = async (
  id,
  authToken
  // searchTerm
) => {
  try {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await axios.delete(
      `${API_BASE_URL}/v1/users/dealer/${id}`,
      { headers }
    );
    console.log("response bookings", response);
    // Check if the response contains data
    if (response.data) {
      console.log("Response Data: vendor gears", response.data);
      return response.data;
    } else {
      // If the response doesn't contain data, consider it an error
      throw new Error("Empty response data");
    }
  } catch (error) {
    // Log the entire error object for debugging purposes
    console.error("API Error:", error);

    // Return an error object or message to handle in your application
    return error.response.data;
  }
};
