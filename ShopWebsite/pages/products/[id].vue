<template>
  <div>
    <div class="flex w-full py-5">
      <div class="w-1/2 px-16 flex">
        <img
          :src="getProductImageLink(product)"
          :alt="product.TenSanPham"
          class="h-128 object-fill items-center justify-center border" />
      </div>
      <div class="grid grid-cols-1 grid-flow-row h-full w-1/2 text-2xl gap-7">
        <h1 class="font-bold">{{ product.TenSanPham }}</h1>
        <div class="flex items-center">
          <!-- <v-rating
            v-model="product.rating.rate"
            active-color="orange-lighten-1"></v-rating> -->
          <!-- <p>({{ product.rating.count }} reviews)</p> -->
        </div>
        <p>{{ toMoney(product.GiaNiemYet) }}</p>
        <p>{{ product.MoTaSanPham }}</p>
        <p class="font-bold">Size</p>
        <div class="flex space-x-2">
          <v-btn-toggle v-model="sizeToggleButton" color="black">
            <v-btn value="S"> S </v-btn>
            <v-btn value="M"> M </v-btn>
            <v-btn value="L"> L </v-btn>
            <v-btn value="XL"> XL </v-btn>
          </v-btn-toggle>
        </div>
        <p class="font-bold">Quantity</p>
        <div class="w-fit">
          <v-number-input
            control-variant="split"
            :min="1"
            v-model="productQuantity"></v-number-input>
        </div>
        <div class="w-full grid grid-cols-3 justify-items-center">
          <button
            class="bg-slate-800 hover:bg-slate-200 text-slate-200 hover:text-slate-800 rounded-xl w-full col-start-2 py-3 hover:shadow-xl duration-100">
            Add to cart
          </button>
        </div>
      </div>
    </div>
    <h1 class="font-bold text-2xl py-5">Đánh giá</h1>
    <div class="space-y-5">
      <div v-for="review in reviews">
        <div class="flex border items-center space-x-4 w-full px-4 py-2">
          <div>
            <v-tooltip
              :text="review.TenKhachHang"
              location="start"
              id="customerAvatar">
              <template v-slot:activator="{ props }">
                <img
                  :src="getReviewAvatarLink(review)"
                  alt=""
                  class="h-16 object-fill"
                  v-bind="props" />
              </template>
            </v-tooltip>
          </div>
          <div class="flex w-full justify-between">
            <h1>{{ review.NoiDungDanhGia }}</h1>
            <h1 class="font-bold">
              {{ toDate(review.NgayDanhGia) }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const productID = useRoute().params.id;
const { data: product } = await useAsyncData("product", () =>
  $fetch(`http://localhost:3001/currentproducts/${productID}`)
);

const { data: reviews } = await useAsyncData("reviews", () =>
  $fetch(`http://localhost:3001/currentproducts/${productID}/reviews`)
);

console.log(reviews.value);
const productQuantity = ref(1);
const sizeToggleButton = ref("");

function getProductImageLink(product) {
  return `/img/data/${product.HinhSanPham}`;
}

function getReviewAvatarLink(review) {
  return `/img/data/${review.HinhDaiDien}`;
}

function toMoney(value) {
  return parseInt(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function toDate(value) {
  return new Date(value).toLocaleDateString("vi-VN");
}
</script>

<style></style>
