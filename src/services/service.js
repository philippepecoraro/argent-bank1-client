import axios from "axios";
import authHeader from "./authHeader";

//const API_URL = "http://localhost:3001/api/v1/";
const API_URL = "https://argent-bank1-server.onrender.com/api/v1";

const register = (email, password, firstName, LastName) => {
  return axios.post(API_URL + "user/signup", {
    email,
    password,
    firstName,
    LastName,
  });
};

const login = async (email, password) => {
  const boxChecked = JSON.parse(localStorage.getItem("rememberMe"));
  const response = await axios.post(API_URL + "user/login", {
    email,
    password,
  });
  if (response.data.body.token && boxChecked) {
    localStorage.setItem("jwtToken", JSON.stringify(response.data.body.token));
  }
  if (response.data.body.token && boxChecked === null) {
    sessionStorage.setItem(
      "jwtToken",
      JSON.stringify(response.data.body.token)
    );
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");
  localStorage.removeItem("rememberMe");
};

const updateUser = (firstName, lastName) => {
  return axios.put(
    API_URL + "user/profile",
    {
      firstName,
      lastName,
    },
    { headers: authHeader() }
  );
};

const profile = () => {
  return axios.post(API_URL + "user/profile", {}, { headers: authHeader() });
};

const service = {
  register,
  login,
  logout,
  updateUser,
  profile,
};

export default service;
