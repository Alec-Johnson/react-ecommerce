import axios from "axios";

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false; // no access

  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true; // admin access

  return false;
};

export const apiInstance = axios.create({
  baseURL: "http://localhost:5001/react-ecommerce-e6547/us-central1/api", // firebase function api url
});
