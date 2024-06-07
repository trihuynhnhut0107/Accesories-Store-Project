<template>
  <v-app>
    <div class="container mx-auto h-screen w-screen relative">
      <!-- Header -->
      <div
        class="flex justify-between sticky top-0 py-5 bg-slate-800 text-white z-50 w-full items-center">
        <div>
          <NuxtLink to="/">
            <img
              src="/img/logo.jpg"
              alt="Logo"
              class="h-16 object-contain p-2" />
          </NuxtLink>
        </div>
        <div>Main coordinate</div>
        <div class="flex space-x-4">
          <div>
            <v-tooltip bottom close-delay="500">
              <template v-slot:activator="{ props }">
                <NuxtLink to="/cart">
                  <v-badge left color="red" :content="cartSize">
                    <button v-bind="props">
                      <v-icon>mdi-cart</v-icon>
                    </button>
                  </v-badge>
                </NuxtLink>
              </template>
              <div class="bg-white">
                <div class="container w-full my-2 p-2 flex flex-col space-y-5">
                  <div
                    v-for="cartitem in cartInfo"
                    class="flex flex-row space-x-5 items-center">
                    <div
                      class="flex flex-row space-y-5 p-2 justify-between items-center w-full">
                      <div class="flex flex-col items-start">
                        <div class="font-bold">{{ cartitem.TenSanPham }}</div>
                        <div>{{ toMoney(cartitem.GiaNiemYet) }}</div>
                      </div>

                      <div class="flex flex-row items-end">
                        Số lượng: {{ cartitem.SoLuong }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-tooltip>
          </div>

          <NuxtLink to="/"><button @click="logOut">Logout</button></NuxtLink>
        </div>
      </div>
      <!-- Main content -->
      <div class="">
        <slot />
      </div>
      <!-- Footer -->
    </div>
  </v-app>
</template>

<script setup>
const isCartOpen = ref(false);

function cartClicked() {
  isCartOpen.value = !isCartOpen.value;
}

function getImageLink(value) {
  return `/img/data/${value}`;
}

const userStore = useUserStore();

const { data: cartInfo } = await useAsyncData("cartInfo", () =>
  $fetch(`http://localhost:3001/user/cart/${userStore.token}`)
);

console.log(cartInfo.value);

const cartSize = ref(cartInfo.value.length);

const logOut = () => {
  userStore.logOut();
  useRouter().go(0);
  navigateTo("/");
};

function toMoney(value) {
  return parseInt(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
</script>

<style>
body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 2px;
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 10px;
}
</style>
