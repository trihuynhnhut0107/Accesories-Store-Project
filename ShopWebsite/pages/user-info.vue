<template>
  <div
    class="container mx-auto flex h-full w-full justify-center items-center py-10">
    <div class="flex flex-col w-1/2 space-y-10 justify-center">
      <h1 class="text-2xl font-bold mb-4">Thông tin khách hàng</h1>
      <div>
        <v-text-field
          v-model="name"
          type="text"
          class="w-full rounded-md p-2"
          placeholder="Tên khách hàng" />
      </div>
      <div>
        <v-date-input
          label="Ngày sinh"
          v-model="birthday"
          :max="currentDate"></v-date-input>
      </div>
      <div>
        <v-text-field
          v-model="address"
          type="text"
          placeholder="Địa chỉ"
          class="w-full rounded-md p-2" />
      </div>
      <div>
        <v-text-field
          v-model="phoneNumber"
          type="text"
          placeholder="Số điện thoại"
          class="w-full rounded-md p-2" />
      </div>
      <div>
        <v-btn color="secondary" class="w-full" @click="submit">Xác nhận</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});

const userStore = useUserStore();

const name = ref("");
const birthday = ref();
const address = ref("");
const phoneNumber = ref("");

const currentDate = new Date().toISOString().substr(0, 10);

async function submit() {
  const response = await useFetch(
    `http://localhost:3001/user/${userStore.token}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TenKhachHang: name.value,
        NgaySinh: birthday.value.toISOString(),
        DiaChi: address.value,
        SoDienThoai: phoneNumber.value,
      }),
    }
  );
  console.log(response);
}
</script>

<style></style>
