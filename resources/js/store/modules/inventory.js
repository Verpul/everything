const state = {
  inventoryCategories: [],
  categoryItems: [],
  currentCategoryId: null,
  itemFormMode: false,
  currentItemId: null
};

const mutations = {
  setInventoryCategories(state, { categories }) {
    state.inventoryCategories = categories;
  },
  setCategoryItems(state, { items }) {
    state.categoryItems = items;
  },
  setCurrentCategoryId(state, id) {
    state.currentCategoryId = id;
  },
  setItemFormMode(state, mode) {
    state.itemFormMode = mode;
  },
  setCurrentItemId(state, id) {
    state.currentItemId = id;
  }
};

const actions = {
  getAllInventoryCategories({ commit }) {
    axios.get("api/inventory/categories").then(response => {
      commit("setInventoryCategories", { categories: response.data });
    });
  },
  saveNewInvCategory({ dispatch }, data) {
    axios.post("api/inventory/categories", data).then(() => {
      dispatch("getAllInventoryCategories");
    });
  },
  deleteInvCategory({ state, dispatch }) {
    axios
      .delete("api/inventory/categories/" + state.currentCategoryId)
      .then(() => {
        dispatch("getAllInventoryCategories");
      });
  },
  saveEditedInvCategory({ state, dispatch }, data) {
    axios
      .put("api/inventory/categories/" + state.currentCategoryId, data)
      .then(() => {
        dispatch("getAllInventoryCategories");
      });
  },
  getCategoryItems({ state, commit }) {
    axios
      .get("api/inventory/categories/" + state.currentCategoryId)
      .then(response => {
        response.data.forEach(item => {
          item.fields = JSON.parse(item.fields);
        });
        commit("setItemFormMode", response.data.length ? false : true);
        commit("setCategoryItems", { items: response.data });
      });
  },
  saveNewInvItem({ dispatch, state }, item) {
    axios.post("api/inventory/items", item).then(() => {
      dispatch("getCategoryItems");
    });
  },
  saveEditedInvItem({ dispatch, state }, item) {
    axios.put("api/inventory/items/" + state.currentItemId, item).then(() => {
      dispatch("getCategoryItems");
    });
  },
  deleteInvItem({ dispatch }, id) {
    axios.delete("api/inventory/items/" + id).then(() => {
      dispatch("getCategoryItems");
    });
  }
};

const getters = {
  inventoryCategories(state) {
    return state.inventoryCategories;
  },
  // inventoryCategoryFields: (state) => (id) => {
  //   return state.inventoryCategories.find((category) => category.id === id).fields;
  // },
  inventoryCategoryFields(state) {
    // Category not chosen
    if (!state.currentCategoryId) return;

    return state.inventoryCategories.find(
      category => category.id === state.currentCategoryId
    ).fields;
  },
  inventoryCategoryItems(state) {
    return state.categoryItems;
  },
  inventoryCategoryId(state) {
    return state.currentCategoryId;
  },
  inventoryItemFormMode(state) {
    return state.itemFormMode;
  },
  inventoryitemData(state) {
    if (!state.currentItemId) return;

    return state.categoryItems.find(item => item.id === state.currentItemId);
  },
  inventoryItemid(state){
    return state.currentItemId;
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations
};
