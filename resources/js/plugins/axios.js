import store from "../store";
import router from "../router";

window.axios = require("axios");
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    // Logout user if token refresh didn't work
    if (error.config.url == "api/auth/refresh") {
      store.commit("setUserData", null);
      store.commit("setUserToken", null);
      router.push("signIn");

      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== "api/auth/signin"
    ) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise(function(resolve, reject) {
        store
          .dispatch("refreshToken")
          .then(response => {
            originalRequest.headers["Authorization"] = "Bearer " + response;
            processQueue(null, response);
            resolve(axios(originalRequest));
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
