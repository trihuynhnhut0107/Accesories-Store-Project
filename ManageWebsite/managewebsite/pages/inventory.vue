<template>
  <div>
    <v-data-table
      v-model="selectedRows"
      :items="products"
      :item-selectable="true"
      :show-select="true"
      return-object
      select-strategy="single">
    </v-data-table>
    <pre>{{ selectedRows }}</pre>
  </div>
</template>

<script setup>
const { data: products } = useAsyncData(async () => {
  const response = await fetch("http://localhost:3001/currentproducts");
  return await response.json();
});
console.log(products);

const headers = [
  { title: "No data, just a label" },
  { key: "quantity" },
  { value: "price" },
];

const selectedRows = ref([]);
</script>

<style></style>
