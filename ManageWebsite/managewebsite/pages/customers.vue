<template>
  <div>
    <v-data-table :items="customers"> </v-data-table>
  </div>
</template>

<script setup>
const { data: customers } = useAsyncData(async () => {
  const response = await fetch("http://localhost:3001/users");
  return await response.json();
});
</script>

<style></style>
