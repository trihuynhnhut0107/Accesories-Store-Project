<template>
  <div
    class="container mx-auto flex h-full w-full justify-center items-center py-10">
    <div class="flex flex-col w-1/2 space-y-10 justify-center">
      <h1 class="text-2xl font-bold mb-4">Đăng nhập</h1>
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
        <v-btn color="secondary" class="w-full" @click="signIn"
          >Đăng nhập</v-btn
        >
      </div>
      <div class="flex space-x-1 font-bold">
        <h1>Chưa có tài khoản?</h1>
        <NuxtLink to="/signup"
          ><button class="hover:underline">Đăng ký</button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  layout: "blank",
  middleware: "already-auth",
});

const userName = ref("");
const password = ref("");

const userStore = useUserStore();
const signIn = async () => {
  await userStore.signIn({
    username: userName.value,
    password: password.value,
  });
  navigateTo("/");
};
</script>

<style></style>
