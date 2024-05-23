<template>
  <v-app>
    <div class="container mx-auto h-screen w-screen">
      <!-- Header -->
      <div
        class="flex justify-between sticky top-0 py-5 bg-slate-800 text-white z-50 w-full">
        <div>Logo</div>
        <div>Main coordinate</div>
        <div class="flex space-x-4">
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <button v-bind="props">
                  <v-icon>mdi-cart</v-icon>
                </button>
              </template>
            </v-tooltip>
          </div>
          <div>Login</div>
        </div>
      </div>
      <!-- Main content -->
      <div class="">
        <slot />
      </div>
      <!-- Footer -->
      <div>
        <div class="flex justify-between bg-slate-800 text-white py-5 my-16">
          <div>Logo</div>
          <div>Address</div>
          <div>Contacts</div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script setup>
const isCartOpen = ref(false);

function cartClicked() {
  isCartOpen.value = !isCartOpen.value;
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
