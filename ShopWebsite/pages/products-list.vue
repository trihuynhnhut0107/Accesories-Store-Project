<template>
  <div class="container h-full flex">
    <div class="sticky w-1/3 h-full space-y-5 py-5">
      <v-expansion-panels>
        <v-expansion-panel title="Filter by category">
          <v-radio-group
            v-model="selectedCategory"
            class="space-y-2"
            @update:model-value="fetchByCategory">
            <div v-for="category in categories" :key="category.id">
              <v-radio
                :label="category"
                :value="category"
                class="text-black"></v-radio>
            </div>
          </v-radio-group>
        </v-expansion-panel>
        <v-expansion-panel
          title="Title"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima">
        </v-expansion-panel>
        <v-expansion-panel
          title="Title"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <div class="grid grid-flow-row grid-cols-3">
      <div v-if="!selectedCategory">
        <div v-for="item in items" :key="item.id" class="items-center m-4">
          <NuxtLink :to="`/products/${item.id}`">
            <button class="h-full w-full">
              <div
                class="hover:shadow-xl justify-items-center items-center duration-100">
                <div
                  class="grid grid-flow-row grid-flow-cols-1 justify-items-center items-center w-full">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-52 object-contain h-52" />
                  <h1 class="text-xl">{{ item.title }}</h1>
                  <h1 class="font-bold">${{ item.price }}</h1>
                </div>
              </div>
            </button>
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <div
          v-for="item in productByCategories"
          :key="item.id"
          class="items-center m-4">
          <NuxtLink :to="`/products/${item.id}`">
            <button class="h-full w-full">
              <div
                class="hover:shadow-xl justify-items-center items-center duration-100">
                <div
                  class="grid grid-flow-row grid-flow-cols-1 justify-items-center items-center w-full">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-52 object-contain h-52" />
                  <h1 class="text-xl">{{ item.title }}</h1>
                  <h1 class="font-bold">${{ item.price }}</h1>
                </div>
              </div>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: items } = await useAsyncData("items", () =>
  $fetch("https://fakestoreapi.com/products")
);
const { data: categories } = await useAsyncData("categories", () =>
  $fetch("https://fakestoreapi.com/products/categories")
);

const selectedCategory = ref("");
await function fetchByCategory() {
  const { data: productByCategories } = useAsyncData(
    "productByCategories",
    () =>
      $fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
  );
};
</script>

<style></style>
