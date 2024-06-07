<template>
  <div class="space-y-5">
    <h1>Thông tin đơn hàng</h1>
    <div v-for="item in checkoutInfo">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text>
          <div class="flex justify-between">
            <h1>Tên sản phẩm</h1>
            <h1>{{ item.TenSanPham }}</h1>
          </div>
          <div class="flex justify-between">
            <h1>Đơn giá</h1>
            <h1>{{ item.GiaNiemYet }}</h1>
          </div>
          <div class="flex justify-between">
            <h1>Số lượng</h1>
            <h1>{{ item.SoLuong }}</h1>
          </div>
          <div class="flex justify-between">
            <h1>Thành tiền</h1>
            <h1>{{ item.SoLuong * item.GiaNiemYet }}đ</h1>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div>
      <h1>Thông tin khách hàng</h1>
      <v-text-field
        label="Số điện thoại"
        v-model="customerPhoneNumber"></v-text-field>
      <v-text-field label="Địa chỉ" v-model="customerAddress"></v-text-field>
    </div>
    <div>
      <v-btn color="secondary" @click="confirmCheckout">Xác nhận</v-btn>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const { data: checkoutInfo } = await useAsyncData("checkoutInfo", () =>
  $fetch(`http://localhost:3001/checkout/${userStore.currentBillToken}`)
);

const { data: customerInfo } = await useAsyncData("customerInfo", () =>
  $fetch(`http://localhost:3001/user/${userStore.token}`)
);

const customerPhoneNumber = ref(customerInfo.value.SoDienThoai);

const customerAddress = ref(customerInfo.value.DiaChi);

async function confirmCheckout() {
  const response = await useFetch(
    `http://localhost:3001/confirmcheckout/${userStore.currentBillToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        MaKhachHang: userStore.token,
        SDTKhachHang: customerPhoneNumber.value,
        DiaChiKhachHang: customerAddress.value,
      }),
    }
  );
  if (response.data.value.access) {
    alert("Checkout successful");
    navigateTo("/");
  } else {
    alert("Checkout failed");
  }
}
</script>

<style></style>
