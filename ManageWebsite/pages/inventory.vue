<template>
  <div class="h-full">
    <div>
      <v-snackbar v-model="isSnackbarToggled" timeout="3000" location="top">
        <p class="text-center">
          {{ notificationText }}
        </p>
      </v-snackbar>
    </div>
    <div>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Danh sách sản phẩm</h1>
      </div>
      <div class="flex justify-end py-5">
        <v-btn class="px-4 py-2 bg-secondary text-white">Thêm sản phẩm</v-btn>
      </div>
    </div>

    <div>
      <v-data-table
        v-model="selectedRow"
        :headers="headers"
        :items="products"
        :search="searchTerm"
        return-object
        select-strategy="single"
        class="h-fit border">
        <template v-slot:top>
          <div>
            <v-text-field
              v-model="searchTerm"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              class=""></v-text-field>
          </div>
        </template>
        <template v-slot:headers="{ columns }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="font-bold text-center">{{ column.title }}</span>
              </td>
            </template>
          </tr>
        </template>
        <template v-slot:item.interaction="{ item, index }">
          <div class="flex space-x-2">
            <v-btn
              class="bg-secondary"
              @click="navigateToProduct(item.MaSanPham)"
              >Sửa</v-btn
            >
            <v-btn color="red" @click="deleteProduct(item.MaSanPham)"
              >Xóa</v-btn
            >
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup>
const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData("products", () =>
  $fetch("http://localhost:3001/currentproducts")
);

const headers = [
  { title: "Mã sản phẩm", key: "MaSanPham" },
  { title: "Tên sản phẩm", key: "TenSanPham" },
  { title: "Loại sản phẩm", key: "LoaiSanPham" },
  { title: "Giá niêm yết", key: "GiaNiemYet" },
  { title: "Số lượng đã bán", key: "SoLuongDaBan" },
  { title: "Số lượng trong cửa hàng", key: "SoLuongTrongCuaHang" },
  { title: "Mô tả sản phẩm", key: "MoTaSanPham" },
  { title: "Mã khuyến mãi", key: "MaKhuyenMai" },
  { title: "Tương tác", key: "interaction" },
];

const isAnyRowSelected = ref(false);

const selectedRow = ref([]);

function getProductID() {
  return selectedRow.MaSanPham;
}

function navigateToProduct(index) {
  const route = `/products/${index}`;
  console.log(route);
  navigateTo(route);
}

async function deleteProduct(index) {
  try {
    const response = await $fetch(`http://localhost:3001/products/${index}`, {
      method: "DELETE",
    });

    console.log(response);
    notificationText.value = response.message;
    isSnackbarToggled.value = true;
    refresh();
  } catch (error) {}
}

const notificationText = ref("");
const isSnackbarToggled = ref(false);

const searchTerm = ref("");
</script>

<style></style>
