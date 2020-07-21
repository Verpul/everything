const state =  {
  noteCategories: [],
  notes: [],
  currentCategoryId: null
}

const mutations = {
  setNoteCategories(state, {data}){
    state.noteCategories = data;
  },
  setNotesForCategory(state, {data}){
    state.notes = data;
  },
  setCurrentCategoryId(state, data){
    state.currentCategoryId = data;
  }
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
  loadCateryNotes({commit}, data){
    axios.get('api/notes/categories/' + data).then((response) => {
      commit('setNotesForCategory', {data: response.data});
      commit('setCurrentCategoryId', data);
    })
  },
  saveNewNote({dispatch, state}, data){
    axios.post('api/notes', data).then(() => {
      dispatch('loadCateryNotes', state.currentCategoryId);
    })
  },
  saveEditedNote({dispatch}, data){
    axios.post('api/notes/' + data.get('noteId'), data).then(() => {
      dispatch('loadCateryNotes', state.currentCategoryId);
    })
  },
  deleteNote({dispatch, state}, data){
    axios.delete('api/notes/' + data).then(() => {
      dispatch('loadCateryNotes', state.currentCategoryId);
    })
  },
}

const getters = {
  noteCategories(state){
    return state.noteCategories;
  },
  notes(state){
    return state.notes;
  },
  currentCategoryId(state){
    return state.currentCategoryId;
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}