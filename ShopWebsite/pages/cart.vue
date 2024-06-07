<template>
  <div>
    <h1>Cart</h1>
    <v-data-table
      :headers="headers"
      :items="cartInfo"
      class="elevation-1"
      return-object
      show-select
      v-model="selectedRows"
      item-key="id">
      <template v-slot:item.SoLuong="{ item }">
        <v-number-input
          control-variant="split"
          :min="1"
          :max="item.SoLuongTrongCuaHang"
          class="pt-4 w-fit"
          v-model="item.SoLuong"></v-number-input>
      </template>
      <template v-slot:item.ThanhTien="{ item }">
        {{ item.SoLuong * item.GiaNiemYet }}đ
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn color="error" @click="removeFromCart(item)">Remove</v-btn>
      </template>
    </v-data-table>

    <div class="flex justify-end py-5 px-4">
      <v-btn color="secondary" class="items-end" @click="checkOut">
        Thanh toán
      </v-btn>
    </div>

    <pre>{{ selectedRows }}</pre>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const { data: cartInfo } = await useAsyncData("cartInfo", () =>
  $fetch(`http://localhost:3001/user/cart/${userStore.token}`)
);

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

const selectedRows = ref([]);

const productQuantity = ref(1);

const headers = [
  {
    title: "Sản phẩm",
    key: "TenSanPham",
  },
  {
    title: "Đơn giá",
    key: "GiaNiemYet",
  },
  {
    title: "Số lượng",
    key: "SoLuong",
  },
  {
    title: "Thành tiền",
    key: "ThanhTien",
  },
  {
    title: "",
    key: "action",
  },
];

async function checkOut() {
  let totalPrice = 0;
  selectedRows.value.forEach((item) => {
    totalPrice = totalPrice + item.SoLuong * item.GiaNiemYet;
  });
  console.log(totalPrice);
  const firstResponse = await useFetch("http://localhost:3001/newbill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      MaKhachHang: userStore.token,
      TongGiaTriHoaDon: totalPrice,
      MaNhanVien: 1,
    }),
  });
  console.log(firstResponse.data.value.MaHoaDonMoiNhat);
  const secondResponse = await useFetch(
    `http://localhost:3001/billdetail/${firstResponse.data.value.MaHoaDonMoiNhat}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: selectedRows.value,
    }
  );
  if (secondResponse.data.value.access) {
    userStore.setBillToken(firstResponse.data.value.MaHoaDonMoiNhat);
    navigateTo("/checkout");
  } else alert("Checkout failed");
}
</script>

<style></style>
