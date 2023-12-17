import axios from "axios";


const hostname = "http://localhost:8080";
// const hostname = "https://vietlinhtinh-api-production.up.railway.app";

const getToken = () => {
    return JSON.parse(localStorage.getItem("token"));
  };

  
const renewAccessToken = () => {

    const token = getToken();
    if (!token) {
        return Promise.reject("No token stored");
    }
    return axios.post(hostname + "/api/auth/token", {
        refreshToken: token.refreshToken,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
    }).catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    });
}
const handleGetRequest = (url, config) => {
    return axios.get(url, config).catch((err) => {
      console.log(err);
      return renewAccessToken().then(() => {
        return axios.get(url, config);
      })
    });
}

const handlePostRequest = (url, data) => {
    return axios.post(url, data, header_config()).catch((err) => {
      console.log(err);
      return renewAccessToken().then(() => {
        return axios.post(url, data, header_config());
      })
    });
  }
  const handlePutRequest = (url, data) => {
    return axios.put(url, data, header_config()).catch((err) => {
      console.log(err);
      return renewAccessToken().then(() => {
        return axios.post(url, data, header_config());
      })
    });
  }

const handleDeleteRequest = (url) => {
    return axios.delete(url, header_config()).catch((err) => {
        console.log(err);
        return renewAccessToken().then(() => {
        return axios.delete(url, header_config());
        })
    });
}

const header_config = () => {
    const accessToken = JSON.parse(localStorage.getItem("token"))?.accessToken;
    return accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {};
  };

const request_utils = {
    host: hostname,
    // host: 'https://vietlinhtinh-production.up.railway.app',
    header_config,
    handleGetRequest,
    handlePostRequest,
    handlePutRequest,
    handleDeleteRequest,
};

export default request_utils;