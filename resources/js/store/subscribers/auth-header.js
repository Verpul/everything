import store from "../index";

store.subscribe(mutation => {
  if (mutation.type === "setUserToken") {
    if (mutation.payload) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${mutation.payload}`;
      localStorage.setItem("token", mutation.payload);
    } else {
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("token");
    }
  }
});
