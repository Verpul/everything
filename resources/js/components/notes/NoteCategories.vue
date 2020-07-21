<template>
  <v-row>
    <v-col cols="2">
      <v-card max-width="300" tile>
        <v-list flat>
          <!-- List header -->
          <v-subheader>
            <v-row
              ><v-col align-self="center">КАТЕГОРИИ</v-col
              ><v-col align="right">
                <v-btn
                  icon
                  small
                  color="green"
                  @click="changeCategory = true"
                  :disabled="changeCategory"
                  ><v-icon>mdi-beaker-plus-outline </v-icon></v-btn
                ></v-col
              ></v-row
            ></v-subheader
          >

          <!-- List body -->
          <v-list-item-group color="primary">
            <!-- Input for create/edit category -->
            <v-list-item v-if="changeCategory">
              <v-text-field
                v-model.trim="newCategoryName"
                :error-messages="categoryTitleErrors"
                label="Имя категории"
                dense
                ref="categoryInput"
              ></v-text-field>
              <!-- Save category button -->
              <v-btn icon small color="primary" @click="saveNotesCategory()"
                ><v-icon>mdi-check-circle-outline</v-icon></v-btn
              >
              <!-- Discard category changes button -->
              <v-btn icon small color="red" @click="clearCategoryData()"
                ><v-icon>mdi-cancel</v-icon></v-btn
              >
            </v-list-item>

            <!-- Categories list -->
            <v-list-item
              v-for="category in getNoteCategories"
              :key="category.id"
              @click="loadCategoryNotes(category.id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="category.title"></v-list-item-title>
              </v-list-item-content>
              <!-- Edit category button -->
              <v-btn
                icon
                small
                color="orange"
                @click.stop="editNoteCategory(category)"
                ><v-icon class="hover">mdi-file-edit-outline</v-icon></v-btn
              >
              <!-- Delete category button -->
              <v-btn
                icon
                small
                color="red"
                @click.stop="deleteNoteCategory(category.id)"
                ><v-icon class="hover">mdi-trash-can-outline</v-icon></v-btn
              >
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="10">
      <app-notes v-if="showNotes"></app-notes>
    </v-col>
  </v-row>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import Notes from "./Notes.vue";

export default {
  data: () => ({
    changeCategory: false,
    newCategoryName: "",
    editMode: false,
    categoryId: null,
    uniqueCategoryName: true,
    showNotes: false
  }),
  methods: {
    // Save new or edited category
    saveNotesCategory() {
      // Validation errors check
      this.$v.$touch();

      if (this.$v.$anyError) {
        return;
      }

      const action = this.editMode
        ? "saveEditedNoteCategory"
        : "saveNewNoteCategory";

      this.$store.dispatch(action, {
        categorieTitle: this.newCategoryName,
        categoryId: this.categoryId
      });

      this.clearCategoryData();
    },
    // Prepare category for edit
    editNoteCategory(category) {
      this.editMode = true;
      this.categoryId = category.id;
      this.changeCategory = true;
      setTimeout(() => {
        this.newCategoryName = category.title;
        this.$refs.categoryInput.focus();
      }, 0);
    },
    deleteNoteCategory(categoryId) {
      this.$store.dispatch("deleteNoteCategory", categoryId);
      this.clearCategoryData();
    },
    // clear category create/edit data
    clearCategoryData() {
      this.changeCategory = false;
      this.newCategoryName = "";
      this.editMode = false;
      this.categoryId = null;
      this.uniqueCategoryName = true;
      this.$v.$reset();
    },
    loadCategoryNotes(categoryId) {
      this.$store.dispatch("loadCateryNotes", categoryId);
      this.showNotes = true;
    }
  },
  created() {
    // Load all categories
    this.$store.dispatch("getAllNoteCategories");
  },
  computed: {
    // Get all loaded categories
    getNoteCategories() {
      return this.$store.getters.noteCategories;
    },
    categoryTitleErrors() {
      const errors = [];
      if (!this.$v.newCategoryName.$dirty) return errors;
      !this.$v.newCategoryName.maxLength &&
        errors.push("Имя категории должно быть не длиннее 50 символов");
      !this.$v.newCategoryName.required &&
        errors.push("Необходимо заполнить имя категории");
      return errors;
    }
  },
  components: {
    "app-notes": Notes
  },
  validations: {
    newCategoryName: {
      required,
      maxLength: maxLength(50)
    }
  }
};
</script>

<style scoped>
.v-list-item:hover .hover {
  opacity: 1;
}

.v-list-item .hover {
  opacity: 0;
}
</style>
