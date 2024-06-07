<template>
  <div>
    <v-data-table :headers="headers" :items="orders">
      <template v-slot:item.interaction="{ item, index }">
        <div class="flex space-x-2">
          <NuxtLink>
            <v-btn class="bg-secondary" @click="navigateToOrders(item.MaHoaDon)"
              >Thông tin</v-btn
            >
          </NuxtLink>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
const { data: orders } = useAsyncData("orders", () =>
  $fetch("http://localhost:3001/orders")
);

const headers = [
  { title: "Mã hóa đơn", key: "MaHoaDon" },
  { title: "Tên khách hàng", key: "TenKhachHang" },
  { title: "Số điện thoại", key: "SDTKhachHang" },
  { title: "Địa chỉ khách hàng", key: "DiaChiKhachHang" },
  { title: "Giá trị hóa đơn", key: "TongGiaTriHoaDon" },
  { title: "Tình trạng", key: "TinhTrang" },
  { title: "", key: "interaction" },
];

function navigateToOrders(index) {
  const route = `/order/${index}`;
  console.log(route);
  navigateTo(route);
}
</script>

<style></style>
