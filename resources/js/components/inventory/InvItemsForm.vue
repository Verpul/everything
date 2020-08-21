<template>
  <v-card>
    <v-card-text>
      <form>
        <v-text-field
          label="Наименование"
          v-model="itemTitle"
          :error-messages="itemTitleErrors"
          outlined
        ></v-text-field>
        <!-- Item fields -->
        <div v-for="field in itemFields" :key="field.id">
          <v-text-field
            :type="field.type"
            :label="field.title"
            v-model="field.value"
            :placeholder="field.type === 'Date' ? 'dd.mm.yyyy' : ''"
            outlined
            v-if="field.type !== 'Text'"
          ></v-text-field>
          <v-textarea
            :label="field.title"
            v-model="field.value"
            outlined
            v-else
          ></v-textarea>
        </div>
        <v-btn class="mr-4" color="primary" @click="saveInvItem()"
          >Сохранить</v-btn
        >
        <v-btn @click="closeItemForm()">Отмена</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      itemTitle: "",
      fields: [],
    };
  },
  methods: {
    saveInvItem() {
      // Validation errors check
      this.$v.$touch();

      if (this.$v.$anyError) {
        return;
      }
      
      const categoryId = this.$store.getters.inventoryCategoryId;
      const action = this.$store.getters.inventoryItemid ? 'saveEditedInvItem' : 'saveNewInvItem';
     
     this.$store.dispatch(action, {
        title: this.itemTitle,
        fields: this.fields,
        categoryId: categoryId
      });
    },
    closeItemForm() {
      this.$store.commit("setItemFormMode", false);
    }
  },
  computed: {
    itemFields() {
      // All category fields
      this.fields = this.$store.getters.inventoryCategoryFields;
      // Edit: load saved item fields and values
      const itemData = this.$store.getters.inventoryitemData;
      if (itemData) {
        this.itemTitle = itemData.title;
        // Set fields values
        itemData.fields.forEach(itemField => {
          this.fields.find(categoryField => {
            if (categoryField.title === itemField.title)
              categoryField.value = itemField.value;
          });
        });
      // Clear values in case of new Item 
      }else{
        this.fields.forEach((field) => field.value = "");
      }
      return this.fields;
    },
    itemTitleErrors() {
      const errors = [];
      if (!this.$v.itemTitle.$dirty) return errors;
      !this.$v.itemTitle.maxLength &&
        errors.push("Наименование должно быть не длиннее 50 символов");
      !this.$v.itemTitle.required &&
        errors.push("Необходимо заполнить наименование");
      return errors;
    },
  },
  validations: {
    itemTitle: {
      required,
      maxLength: maxLength(50)
    },
  }
};
</script>
