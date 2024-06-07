<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-extrabold text-center py-5">Products</h1>

    <div>
      <v-text-field
        label="Search"
        v-model="searchValue"
        @input="searchProducts"></v-text-field>
    </div>
    <div class="container my-5">
      <div class="bg-white transition-all duration-100">
        <div
          v-if="searchValue === ''"
          class="grid grid-cols-4 grid-flow-row justify-items-center items-center">
          <div
            v-for="product in products"
            :key="product.MaSanPham"
            class="items-center h-full w-full elevation-1 m-4">
            <NuxtLink :to="`/products/${product.MaSanPham}`">
              <button class="h-full w-full">
                <div
                  class="hover:shadow-xl justify-items-center items-center duration-100">
                  <div
                    class="grid grid-flow-row grid-flow-cols-1 justify-items-center items-center w-full">
                    <img
                      :src="getImageLink(product.HinhSanPham)"
                      :alt="product.TenSanPham"
                      class="w-52 object-fill h-52" />
                    <h1 class="text-xl">{{ product.TenSanPham }}</h1>
                    <h1 class="font-bold">{{ toMoney(product.GiaNiemYet) }}</h1>
                  </div>
                </div>
              </button>
            </NuxtLink>
          </div>
        </div>
        <div
          v-else
          class="grid grid-cols-4 grid-flow-row justify-items-center items-center">
          <div
            v-for="product in searchedProducts"
            class="items-center h-full w-full elevation-1 m-4">
            <NuxtLink :to="`/products/${product.MaSanPham}`">
              <button class="h-full w-full">
                <div
                  class="hover:shadow-xl justify-items-center items-center duration-100">
                  <div
                    class="grid grid-flow-row grid-flow-cols-1 justify-items-center items-center w-full">
                    <img
                      :src="getImageLink(product.HinhSanPham)"
                      :alt="product.TenSanPham"
                      class="w-52 object-fill h-52" />
                    <h1 class="text-xl">{{ product.TenSanPham }}</h1>
                    <h1 class="font-bold">{{ toMoney(product.GiaNiemYet) }}</h1>
                  </div>
                </div>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: products } = await useAsyncData("products", () =>
  $fetch("http://localhost:3001/currentproducts")
);
const { data: searchedProducts } = await useAsyncData("searchedProducts", () =>
  $fetch(`http://localhost:3001/search/${searchValue.value}`)
);

definePageMeta({
  middleware: "auth",
});

function buttonClick() {
  console.log("Button clicked");
}

function toMoney(value) {
  return parseInt(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function getImageLink(value) {
  return `/img/data/${value}`;
}

const searchValue = ref("");

function searchProducts() {
  refreshNuxtData();
}
</script>

<style></style>
