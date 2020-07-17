const state =  {
  noteCategories: [],
}

const mutations = {
  setNoteCategories(state, {data}){
    state.noteCategories = data;
  },
}

const actions = {
  getAllNoteCategories({commit}){
    axios.get('api/notes/categories').then((response) => {
      commit('setNoteCategories', {data: response.data});
    })
  },
  saveNewNoteCategory({dispatch}, data){
    axios.post('api/notes/categories', data).then(() => {
      dispatch('getAllNoteCategories');
    })
  },
  saveEditedNoteCategory({dispatch}, data){
    axios.put('api/notes/categories/' + data.categoryId, data).then(() => {
      dispatch('getAllNoteCategories');
    })
  },
  deleteNoteCategory({dispatch}, data){
    axios.delete('api/notes/categories/' + data).then(() => {
      dispatch('getAllNoteCategories');
    })
  },
}

const getters = {
  noteCategories(state){
    return state.noteCategories;
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}