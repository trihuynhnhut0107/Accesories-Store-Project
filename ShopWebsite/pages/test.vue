<template>
  <div>
    <div v-for="product in products">
      <div>
        <h1>{{ product.MaSanPham }}</h1>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
const { data: products } = useAsyncData(() =>
  fetch("http://localhost:3001/currentproducts").then((res) => res.json())
);
// function postData() {
//   fetch("http://localhost:3001/products", {
//     method: "POST",
//     body: JSON.stringify({
//       name: "Jayden",
//       description: "Dancer",
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// }
console.log(products.value);
</script>

<style></style>
