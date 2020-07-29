const state = {
  token: null,
  userData: null
};

const mutations = {
  setUserToken(state, token) {
    state.token = token;
  },
  setUserData(state, userData) {
    state.userData = userData;
  }
};

const actions = {
  login({ dispatch }, credentials) {
    return axios.post("api/auth/signin", credentials).then(response => {
      return dispatch("loadUserData", response.data.access_token);
    });
  },
  loadUserData({ commit, state }, token) {
    if (token) {
      commit("setUserToken", token);
    }

    if (!state.token) {
      return;
    }

    return axios
      .get("api/auth/profile")
      .then(response => {
        commit("setUserData", response.data);
      })
      .catch(() => {
        commit("setUserToken", null);
        commit("setUserData", null);
      });
  },
  signOut({ commit }) {
    return axios.post("api/auth/signout").then(() => {
      commit("setUserToken", null);
      commit("setUserData", null);
    });
  },
  refreshToken({ commit }) {
    return axios.post("api/auth/refresh").then(response => {
      commit("setUserToken", response.data.access_token);
      return response.data.access_token;
    });
  },
};

const getters = {
  authenticated(state) {
    return state.token && state.userData;
  },

  userData(state) {
    return state.userData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
