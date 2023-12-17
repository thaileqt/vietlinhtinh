import axios from "axios";
import UserService from "./user.service";
import request_utils from "../commons/request_utils";


const config = () => {
  const accessToken = JSON.parse(localStorage.getItem("token"))?.accessToken;
  return accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
};

const API_URL = request_utils.host + "/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};



const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.userId) {
        localStorage.setItem("token", JSON.stringify(response.data));
        // get user info
        return UserService.getProfile(response.data.userId).then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        }).catch((err) => {
          console.log('inner')
          console.log(err);
        }); 
      }
      return response.data;
    }).catch((err) => {
      console.log(err)
      console.log(username, password)
      throw new Error("Sai tên đăng nhập hoặc mật khẩu");
      
    });
};

const logout = () => {
  const tempConfig = config();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return axios.post(API_URL + "logout", tempConfig).then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const renewAccessToken = () => {
  
  const token = getToken();
  if (!token) {
    return Promise.reject("No token stored");
  }
  return axios.post(API_URL + "token", {
    refreshToken: token.refreshToken,
  }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response.data;
  }).catch((err) => {
    console.log(err);
    logout();
  });
}

const changePassword = (oldPassword, newPassword) => {
  const url = `${API_URL}change-password`;
  return axios.post(url, {
    oldPassword,
    newPassword,
  }, config()).then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
    return AuthService.renewAccessToken().then(() => {
      return axios.post(url, {
        oldPassword,
        newPassword,
      }, config());
    })
  });
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  renewAccessToken,
  changePassword,
}

export default AuthService;
