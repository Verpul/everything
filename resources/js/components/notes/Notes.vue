<template>
  <div>
    <!-- Add new note panel -->
    <v-expansion-panels class="mb-6" v-model="showCreateNoteForm">
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          <span class="grey--text text--darken-1">ДОБАВИТЬ ЗАМЕТКУ</span>
          <template v-slot:actions>
            <v-icon color="success">mdi-book-plus</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-text-field
            v-model.trim="noteTitle"
            label="Наименование заметки"
            :error-messages="noteTitleErrors"
            dense
            class="mb-3"
          ></v-text-field>
          <v-textarea
            label="Текст заметки"
            outlined
            auto-grow
            v-model.trim="noteText"
            :error-messages="noteTextErrors"
            ref="noteTextarea"
          ></v-textarea>
          <div align="center">
            <v-btn depressed small color="primary" @click="saveNewNote()"
              >Сохранить</v-btn
            >
            <v-btn depressed small color="error" @click="clearNoteForm()"
              >Отмена</v-btn
            >
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Existing notes -->
    <v-expansion-panels multiple focusable>
      <v-expansion-panel v-for="note in getNotes" :key="note.id">
        <v-expansion-panel-header>{{ note.title }}</v-expansion-panel-header>
        <v-expansion-panel-content class="mt-3">
          {{ note.text }}
          <div align="center">
            <!-- Edit category button -->
            <v-btn depressed small color="warning" @click.stop="editNote(note)"
              >Редактировать</v-btn
            >
            <!-- Delete category button -->
            <v-btn
              depressed
              small
              color="error"
              @click.stop="deleteNote(note.id)"
              >Удалить</v-btn
            >
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      noteTitle: "",
      noteText: "",
      noteId: null,
      showCreateNoteForm: null,
      editMode: false
    };
  },
  methods: {
    // Clear note create/edit data
    clearNoteForm() {
      this.showCreateNoteForm = null;
      this.noteTitle = "";
      this.noteText = "";
      this.noteId = null;
      this.editMode = false;
      this.$v.$reset();
    },
    // Save new or edited
    saveNewNote() {
      // Validation errors check
      this.$v.$touch();

      if (this.$v.$anyError) {
        return;
      }

      const currentCategoryId = this.$store.getters.currentCategoryId;
      const action = this.editMode
        ? "saveEditedNote"
        : "saveNewNote";

      let formData = new FormData();
      formData.append("title", this.noteTitle);
      formData.append("text", this.noteText);
      formData.append("categoryId", currentCategoryId);
      formData.append("noteId", this.noteId);

      if(this.editMode) formData.append("_method", "put");

      this.$store.dispatch(action, formData);

      this.clearNoteForm();
    },
    // Delete note
    deleteNote(noteId) {
      this.$store.dispatch("deleteNote", noteId);
    },
    // Edit note
    editNote(note) {
      this.editMode = true;
      this.showCreateNoteForm = 0;
      this.noteTitle = note.title;
      this.noteId = note.id;
      setTimeout(() => {
        this.noteText = note.text;
        this.$refs.noteTextarea.focus();
      }, 0);
    }
  },
  computed: {
    // Get all notes for category
    getNotes() {
      return this.$store.getters.notes;
    },
    noteTitleErrors() {
      const errors = [];
      if (!this.$v.noteTitle.$dirty) return errors;
      !this.$v.noteTitle.required &&
        errors.push("Необходимо заполнить имя заметки");
      return errors;
    },
    noteTextErrors() {
      const errors = [];
      if (!this.$v.noteText.$dirty) return errors;
      !this.$v.noteText.required &&
        errors.push("Необходимо заполнить текст заметки");
      return errors;
    }
  },
  validations: {
    noteTitle: { required, maxLength: maxLength(50) },
    noteText: { required }
  }
};
</script>
