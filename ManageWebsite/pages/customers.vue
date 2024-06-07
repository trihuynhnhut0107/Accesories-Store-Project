<template>
  <div class="h-full">
    <v-data-table
      v-model="selectedRow"
      :headers="headers"
      :items="customers"
      :item-value="
        (item) =>
          `${item.MaKhachHang}-${item.TenKhachHang}-${item.NgaySinh}-${item.SoDienThoai}`
      "
      :search="searchTerm"
      return-object
      select-strategy="single"
      class="h-fit border">
    </v-data-table>
  </div>
</template>

<script setup>
const {
  data: customers,
  pending,
  error,
  refresh,
} = await useAsyncData("customers", () =>
  $fetch("http://localhost:3001/users")
);

const headers = [
  { title: "Mã khách hàng", key: "MaKhachHang" },
  { title: "Tên khách hàng", key: "TenKhachHang" },
  { title: "Ngày sinh", key: "NgaySinh" },
  { title: "Số điện thoại", key: "SoDienThoai" },
];

const selectedRow = ref([]);

const searchTerm = ref("");
</script>

<style></style>
