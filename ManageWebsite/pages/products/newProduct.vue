<template>
  <div
    class="container mx-auto flex h-full w-full justify-center items-center py-3">
    <div class="flex flex-col w-1/2 space-y-3">
      <h1 class="text-2xl font-bold mb-4">Thêm sản phẩm mới</h1>

      <v-text-field
        type="input"
        v-model="productInfo.TenSanPham"
        label="Tên sản phẩm" />
      <v-text-field
        type="input"
        v-model="productInfo.LoaiSanPham"
        label="Loại sản phẩm" />
      <v-text-field
        type="input"
        v-model="productInfo.GiaNiemYet"
        label="Giá niêm yết" />
      <v-text-field
        type="input"
        v-model="productInfo.SoLuongDaBan"
        label="Số lượng đã bán"
        readonly />
      <v-text-field
        type="input"
        v-model="productInfo.SoLuongTrongCuaHang"
        label="Số lượng trong cửa hàng"
        readonly />
      <v-text-field
        type="input"
        v-model="productInfo.MoTaSanPham"
        label="Mô tả sản phẩm" />
      <v-btn color="primary" @click="submitForm">Sumbit</v-btn>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

const {
  data: productID,
  pending,
  error,
  refresh,
} = await useAsyncData("product", () =>
  $fetch("http://localhost:3001/currentproducts/currentmaxid")
);

const productInfo = ref({
  MaSanPham: "",
  TenSanPham: "",
  GiaNiemYet: "",
  LoaiSanPham: "",
  MoTaSanPham: "",
  SoLuongTrongCuaHang: "",
  SoLuongDaBan: "",
  MaKhuyenMai: "",
  DoanhThu: "",
});

console.log(productInfo.value);

async function submitForm() {
  try {
    const data = await useFetch(
      "http://localhost:3001/products/" + productInfo.value.MaSanPham,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TenSanPham: productInfo.value.TenSanPham,
          LoaiSanPham: productInfo.value.LoaiSanPham,
          MoTaSanPham: productInfo.value.MoTaSanPham,
          GiaNiemYet: productInfo.value.GiaNiemYet,
        }),
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
