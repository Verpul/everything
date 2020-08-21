<template>
  <div>
    <app-inv-list v-if="!itemFormMode"></app-inv-list>
    <app-inv-form v-else></app-inv-form>
  </div>
</template>

<script>
import InvForm from './InvItemsForm';
import InvList from './InvItemsList';

export default {
  components: {
    'app-inv-form' : InvForm,
    'app-inv-list' : InvList
  },
  computed: {
    itemFormMode(){
      return this.$store.getters.inventoryItemFormMode;
    }
  }
};
</script>
