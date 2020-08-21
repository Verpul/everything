<template>
  <v-card>
    <v-btn
      color="primary"
      dark
      small
      absolute
      top
      left
      fab
      @click="setItemFormMode()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row v-for="(chunk, index) in chunkItems" :key="index">
      <v-col v-for="item in chunk" :key="item.id">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              {{ item.title }}
            </p>
            <div
              class="text--primary"
              v-for="field in item.fields"
              :key="field.id"
            >
              <span v-if="field.value"
                >{{ field.title }}: {{ field.value }}</span
              >
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4" @click="setItemFormMode(item.id)">
              Редактировать
            </v-btn>
            <v-btn text color="red" @click="deleteItem(item.id)">
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import InvForm from "./InvItemsForm";

export default {
  data: () => ({}),
  methods: {
    setItemFormMode(id = null) {
      this.$store.commit('setCurrentItemId', id);
      this.$store.commit("setItemFormMode", true);
    },
    deleteItem(id) {
      this.$store.dispatch("deleteInvItem", id);
    },
  },
  computed: {
    chunkItems() {
      const items = this.$store.getters.inventoryCategoryItems;
      return _.chunk(items, 3);
    }
  },
  components: {
    "app-inv-form": InvForm
  }
};
</script>
