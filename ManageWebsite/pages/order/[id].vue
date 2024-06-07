<template>
  <div class="container mx-auto py-16 space-y-5">
    <div class="font-bold text-2xl">Mã hóa đơn: {{ orderID }}</div>
    <div>Thông tin sản phẩm</div>
    <div class="overflow-auto">
      <div v-for="item in orderInfo">
        <v-card>
          <v-card-title>{{ item.TenSanPham }}</v-card-title>
          <v-card-text>
            <div>Giá: {{ item.GiaNiemYet }}</div>
            <div>Số lượng: {{ item.SoLuong }}</div>
            <div>Thành tiền: {{ item.GiaNiemYet * item.SoLuong }}</div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div>Thông tin giao hàng</div>
    <div>
      <v-card class="px-2 py-4">
        <v-text-field
          label="Tên khách hàng:"
          v-model="customerName"></v-text-field>
        <v-text-field
          label="Số điện thoại:"
          v-model="customerPhone"></v-text-field>
        <v-text-field label="Địa chỉ" v-model="customerAddress"></v-text-field>
      </v-card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});
const orderID = useRoute().params.id;

const {
  data: orderInfo,
  pending,
  error,
  refresh,
} = await useAsyncData("orderInfo", () =>
  $fetch("http://localhost:3001/order/" + orderID)
);

const customerName = ref(orderInfo.value[0].TenKhachHang);
const customerPhone = ref(orderInfo.value[0].SDTKhachHang);
const customerAddress = ref(orderInfo.value[0].DiaChiKhachHang);

console.log(orderInfo);
</script>

<style></style>
