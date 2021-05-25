import axios from "axios";

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false; // no access

  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true; // admin access

  return false;
};

export const apiInstance = axios.create({
  baseURL: "https://us-central1-react-ecommerce-e6547.cloudfunctions.net/api", // firebase function api url
});
