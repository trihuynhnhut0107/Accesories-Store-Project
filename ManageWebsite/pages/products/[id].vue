<template>
  <div class="container mx-auto flex h-full w-full justify-center items-center">
    <div class="flex flex-col w-1/2 space-y-5">
      <h1 class="text-2xl font-bold mb-4">
        Mã sản phẩm: {{ product.MaSanPham }}
      </h1>

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
        readonly="true" />
      <v-text-field
        type="input"
        v-model="productInfo.SoLuongTrongCuaHang"
        label="Số lượng trong cửa hàng"
        readonly="true" />
      <v-text-field
        type="input"
        v-model="productInfo.MoTaSanPham"
        label="Mô tả sản phẩm" />
      <v-btn color="primary" @click="submitForm">Sumbit</v-btn>
    </div>
  </div>
</template>

<script setup>
const productID = useRoute().params.id;
console.log(productID);
const {
  data: product,
  pending,
  error,
  refresh,
} = await useAsyncData("product", () =>
  $fetch("http://localhost:3001/currentproducts/" + productID)
);

const productInfo = ref({
  MaSanPham: product.value.MaSanPham,
  TenSanPham: product.value.TenSanPham,
  GiaNiemYet: product.value.GiaNiemYet,
  LoaiSanPham: product.value.LoaiSanPham,
  MoTaSanPham: product.value.MoTaSanPham,
  SoLuongTrongCuaHang: product.value.SoLuongTrongCuaHang,
  SoLuongDaBan: product.value.SoLuongDaBan,
  MaKhuyenMai: product.value.MaKhuyenMai,
  DoanhThu: product.value.DoanhThu,
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

<style lang="scss" scoped></style>
