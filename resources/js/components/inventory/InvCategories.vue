<template>
  <v-row>
    <v-col :cols="addMode ? '4' : '2'">
      <v-card max-width="600" tile>
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
                  @click="addCategoryMode()"
                  :disabled="addMode"
                  ><v-icon>mdi-beaker-plus-outline </v-icon></v-btn
                ></v-col
              ></v-row
            ></v-subheader
          >

          <!-- List body -->
          <v-list-item-group color="primary">
            <!-- Input for create/edit category -->
            <div v-if="addMode">
              <v-list-item>
                <v-text-field
                  v-model.trim="newCategoryName"
                  :error-messages="categoryTitleErrors"
                  label="Имя категории"
                  dense
                  ref="categoryInput"
                ></v-text-field>
                <!-- Save category button -->
                <!-- <v-btn icon small color="primary" @click="saveNotesCategory()"
                  ><v-icon>mdi-check-circle-outline</v-icon></v-btn
                > -->
                <!-- Discard category changes button -->
                <!-- <v-btn icon small color="red" @click="clearCategoryData()"
                  ><v-icon>mdi-cancel</v-icon></v-btn
                > -->
              </v-list-item>
              <v-subheader>
                <v-row
                  ><v-col cols="8" align-self="center"
                    >Дополнительные поля
                    <div
                      class="v-messages error--text"
                      v-if="!$v.fields.required"
                    >
                      Необходимо добавить как минимум одно дополнительное поле
                    </div> </v-col
                  ><v-col align="right">
                    <v-btn icon small color="primary" @click="addNewOption()"
                      ><v-icon>mdi-file-plus-outline</v-icon></v-btn
                    ></v-col
                  ></v-row
                >
              </v-subheader>

              <!-- Category fields block -->
              <v-list-item
                v-for="(field, index) in $v.fields.$each.$iter"
                :key="index"
              >
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      label="Название"
                      dense
                      v-model.trim="field.title.$model"
                      :error-messages="
                        field.$dirty && !field.title.required
                          ? 'Необходимо заполнить имя дополнительного поля'
                          : !field.title.maxLength
                          ? 'Имя дополнительного поля должно быть не длиннее 50 символов'
                          : ''
                      "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="pr-0">
                    <v-select
                      class="pl-3"
                      label="Тип"
                      dense
                      :items="types"
                      v-model="field.type.$model"
                      :error-messages="field.type.$dirty && !field.type.required ? 'Необходимо заполнить тип' : ''"
                    ></v-select>
                  </v-col>
                  <v-col align="right" class="pl-0">
                    <!-- Delete category option button -->
                    <v-btn
                      icon
                      small
                      color="red"
                      @click.stop="deleteInvCategoryOption(index)"
                      ><v-icon>mdi-bookmark-remove-outline</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
                <hr />
              </v-list-item>

              <!-- Save / cancel category buttons -->
              <div align="center">
                <v-btn
                  icon
                  color="success"
                  align="center"
                  @click="saveInvCategory()"
                  ><v-icon>mdi-check-circle-outline</v-icon></v-btn
                >
                <v-btn
                  icon
                  color="red"
                  align="center"
                  @click="clearCategoryData()"
                  ><v-icon>mdi-cancel</v-icon></v-btn
                >
              </div>
            </div>

            <!-- Categories list -->
            <div v-if="!addMode">
              <v-list-item
                v-for="category in getInventoryCategories"
                :key="category.id"
                @click="loadCategoryNotes(category.id)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="category.title"
                  ></v-list-item-title>
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
                  @click.stop="deleteInvCategory(category.id)"
                  ><v-icon class="hover">mdi-trash-can-outline</v-icon></v-btn
                >
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="10">
      <!-- <app-notes v-if="showNotes"></app-notes> -->
    </v-col>
  </v-row>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    addMode: false,
    newCategoryName: "",
    fields: [],
    types: ["String", "Date", "Number", "Text"],

    editMode: false,
    categoryId: null,
    showNotes: false
  }),
  methods: {
    // Show add new category form
    addCategoryMode() {
      this.addMode = true;
      this.addNewOption();
    },
    // Add new option input
    addNewOption() {
      let obj = { title: "", type: "" };
      this.fields.push(obj);
    },
    // Delete category option by index
    deleteInvCategoryOption(index) {
      this.fields.splice(index, 1);
    },
    // Save new or edited category
    saveInvCategory() {
      // Validation errors check
      this.$v.$touch();

      if (this.$v.$anyError) {
        return;
      }

      const action = this.editMode
        ? "saveEditedInvCategory"
        : "saveNewInvCategory";

      this.$store.dispatch(action, {
        categoryTitle: this.newCategoryName,
        fields: this.fields,
        categoryId: this.categoryId
      });

      this.clearCategoryData();
    },
    // Prepare category for edit
    editNoteCategory(category) {
      this.editMode = true;
      this.categoryId = category.id;
      this.addMode = true;
      this.fields = this.$store.getters.inventoryCategoryFields(category.id);
      setTimeout(() => {
        this.newCategoryName = category.title;
        this.$refs.categoryInput.focus();
      }, 0);
    },
    deleteInvCategory(categoryId) {
      this.$store.dispatch("deleteInvCategory", categoryId);
      this.clearCategoryData();
    },
    // clear category create/edit data
    clearCategoryData() {
      this.addMode = false;
      this.newCategoryName = "";
      this.$v.$reset();
      this.fields = [];
      this.editMode = false;
      this.categoryId = null;  
    },
    loadCategoryNotes(categoryId) {
      this.$store.dispatch("loadCateryNotes", categoryId);
      this.showNotes = true;
    }
    // fieldTtitleErrors(index) {
    //   const errors = [];
    //   if (!this.$v.fields.$each.$iter[index].$dirty) return errors;
    //   !this.$v.fields.$each.$iter[index].title.maxLength &&
    //     errors.push(
    //       "Имя дополнительного поля должно быть не длиннее 50 символов"
    //     );
    //   !this.$v.fields.$each.$iter[index].title.required &&
    //     errors.push("Необходимо заполнить имя дополнительного поля");
    //   return errors;
    // },
    // fieldTypeErrors(index) {
    //   const errors = [];
    //   if (!this.$v.fields.$each.$iter[index].$dirty) return errors;
    //   !this.$v.fields.$each.$iter[index].type.required &&
    //     errors.push("Необходимо заполнить тип");
    //   return errors;
    // }
  },
  created() {
    // Load all categories
    this.$store.dispatch("getAllInventoryCategories");
  },
  computed: {
    // Get all loaded categories
    getInventoryCategories() {
      return this.$store.getters.inventoryCategories;
    },
    // Get category fields
    // getInvCategoryFields() {
    //   this.fields = this.editMode
    //     ? this.$store.getters.inventoryCategoryFields(this.categoryId)
    //     : this.fields;
    //   return this.fields;
    // },
    categoryTitleErrors() {
      const errors = [];
      if (!this.$v.newCategoryName.$dirty) return errors;
      !this.$v.newCategoryName.maxLength &&
        errors.push("Имя категории должно быть не длиннее 50 символов");
      !this.$v.newCategoryName.required &&
        errors.push("Необходимо заполнить имя категории");
      return errors;
    },
    fieldsErrors() {
      const errors = [];
      if (!this.$v.fields.$dirty) return errors;
      !this.$v.fields.required &&
        errors.push("Необходимо добавить как минимум одно дополнительное поле");
      return errors;
    }
  },
  validations: {
    newCategoryName: {
      required,
      maxLength: maxLength(50)
    },
    fields: {
      required,
      $each: {
        title: {
          required,
          maxLength: maxLength(50)
        },
        type: {
          required
        }
      }
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
