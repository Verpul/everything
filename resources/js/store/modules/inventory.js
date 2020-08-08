const state =  {
  inventoryCategories: [],
}

const mutations = {
  setInventoryCategories(state, {categories}){
    state.inventoryCategories = categories;
  },
}

const actions = {
  getAllInventoryCategories({commit}){
    axios.get('api/inventory/categories').then((response) => {
      commit('setInventoryCategories', {categories: response.data});
    })
  },
  saveNewInvCategory({dispatch}, data){
    axios.post('api/inventory/categories', data).then(() => {
      dispatch('getAllInventoryCategories');
    })
  },
  deleteInvCategory({dispatch}, id){
    axios.delete('api/inventory/categories/' + id).then(() => {
      dispatch('getAllInventoryCategories');
    })
  },
  saveEditedInvCategory({dispatch}, data){
    axios.put('api/inventory/categories/' + data.categoryId, data).then((response) => {
      dispatch('getAllInventoryCategories');
    })
  }
}

const getters = {
  inventoryCategories(state){
    return state.inventoryCategories;
  },
  inventoryCategoryFields: (state) => (id) => {
    return state.inventoryCategories.find((category) => category.id === id).fields;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}