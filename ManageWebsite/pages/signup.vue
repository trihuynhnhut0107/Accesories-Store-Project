<template>
  <div
    class="container mx-auto flex h-full w-full justify-center items-center py-10">
    <div class="flex flex-col w-1/2 space-y-10 justify-center">
      <h1 class="text-2xl font-bold mb-4">Đăng ký tài khoản</h1>
      <div>
        <v-text-field
          v-model="userName"
          type="text"
          id="username"
          class="w-full rounded-md p-2"
          placeholder="Tên đăng nhập" />
      </div>
      <div>
        <v-text-field
          v-model="password"
          type="password"
          id="password"
          placeholder="Mật khẩu"
          class="w-full rounded-md p-2" />
      </div>
      <div>
        <v-text-field
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          class="w-full rounded-md p-2" />
      </div>
      <div>
        <v-btn color="secondary" class="w-full" @click="signup">Đăng ký</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: "blank",
});

const userStore = useUserStore();

const userName = ref("");
const password = ref("");
const confirmPassword = ref("");

async function signup() {
  try {
    if (password.value !== confirmPassword.value) {
      throw new Error("Mật khẩu không khớp");
    }
    const result = await userStore.signUp({
      username: userName.value,
      password: password.value,
    });
    if (result === false) return;
    else navigateTo("/user-info");
  } catch (error) {
    alert(error);
  }
}
</script>

<style></style>
