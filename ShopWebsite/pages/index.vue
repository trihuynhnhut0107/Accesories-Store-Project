<template>
  <div>
    <div class="relative z-0">
      <img
        src="/img/freestocks-_3Q3tsJ01nc-unsplash.jpg"
        alt="Landing pic"
        class="z-5" />
      <div
        class="absolute top-16 left-[10%] w-fit translate-x-[50%] translate-y-[50%] hover:bg-black hover:text-white bg-white text-black border-4 border-black">
        <button
          class="duration-100 px-4 py-2 text-5xl border-4 border-black z-10 shadow-2xl hover:text-5xl hover:bg-black hover:text-white bg-white text-black"
          @click="buttonClick">
          Shop now
        </button>
      </div>
    </div>
    <!-- <h1 class="text-4xl font-extrabold text-start my-5 py-5">
      Shop by categories
    </h1>
    <div class="container my-5 py-5">
      <v-slide-group class="w-full" center-active>
        <v-slide-group-item v-for="(category, index) in categories">
          <v-card class="w-78">
            <div class="w-full">
              <v-card-text class="line-clamp-2">{{ category }}</v-card-text>
              <img
                :src="items[index].image"
                alt="Category pic"
                class="object-contain h-48 w-96" />
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div> -->
    <h1 class="text-4xl font-extrabold text-center">Our bestsellers</h1>

    <div class="container my-5">
      <div
        class="grid grid-cols-4 grid-flow-row justify-items-center items-center">
        <div
          v-for="product in products"
          :key="product.MaSanPham"
          class="items-center m-4">
          <NuxtLink :to="`/products/${product.MaSanPham}`">
            <button class="h-full w-full">
              <div
                class="hover:shadow-xl justify-items-center items-center duration-100">
                <div
                  class="grid grid-flow-row grid-flow-cols-1 justify-items-center items-center w-full">
                  <!-- <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-52 object-contain h-52" /> -->
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
</template>

<script setup>
const { data: products } = useAsyncData(() =>
  fetch("http://localhost:3001/currentproducts").then((res) => res.json())
);

function buttonClick() {
  console.log("Button clicked");
}

function toMoney(value) {
  return parseInt(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
</script>

<style></style>
