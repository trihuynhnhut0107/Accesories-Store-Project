<template>
  <v-app>
    <div class="h-screen w-screen flex relative">
      <!-- Left panel -->

      <div
        class="w-1/5 flex flex-col bg-secondary rounded-2xl px-4 py-5 my-5 mx-4">
        <div class="flex justify-center">This is a logo</div>

        <div class="container mx-auto flex flex-col justify-between">
          <div v-for="tab in tabArray">
            <NuxtLink :to="`/${tab.tabName === 'home' ? '' : tab.tabName}`">
              <v-btn
                v-on="tab.active"
                :class="`${tab.active ? 'bg-primary' : ''} w-full my-3`"
                @click="tabCLicked(tab.tabName)">
                {{ tab.tabName }}
              </v-btn>
            </NuxtLink>
          </div>
        </div>

        <!-- <div>
          <el-tabs
            :tab-position="tabPosition"
            style="height: 200px"
            class="demo-tabs">
            <div v-for="tab in tabArray">
              <NuxtLink :to="`/${tab}`">
                <el-tab-pane :label="tab" @tab-click="">
                  <div>{{ tab }}</div>
                </el-tab-pane>
              </NuxtLink>
            </div>
          </el-tabs>
        </div> -->
      </div>
      <!-- <div
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        v-on="isPanelHovered"
        :class="`bg-primary h-full rounded-xl duration-100 transition-all ease-in-out  ${
          isPanelHovered
            ? 'w-1/3 transition-all ease-in-out duration-100 absolute'
            : ''
        }`">
        Left panel
      </div> -->
      <!-- Body -->
      <div class="h-full w-full py-12 px-12">
        <slot />
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const isPanelHovered = ref(false);

onMounted(() => {
  if (route.name === "index") {
    tabArray[0].active = true;
  } else {
    tabArray.forEach((tab) => {
      if (tab.tabName === route.name) {
        tab.active = true;
      } else {
        tab.active = false;
      }
    });
  }
});

const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    if (route.name === "index") {
      tabArray[0].active = true;
    } else {
      tabArray.forEach((tab) => {
        if (tab.tabName === route.name) {
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
    }
  }
);

const tabArray = [
  { tabName: "home", active: false },
  { tabName: "customers", active: false },
  { tabName: "inventory", active: false },
  { tabName: "orders", active: false },
];

function tabCLicked(tabName: string) {
  tabArray.forEach((tab) => {
    if (tab.tabName === tabName) {
      tab.active = true;
    } else {
      tab.active = false;
    }
  });
}
</script>

<style>
html {
  overflow: auto;
}
</style>
