<template>
  <v-app>
    <div class="h-screen w-screen flex relative">
      <!-- Left panel -->

      <div>
        This is a logo
        <!-- <v-tabs
          v-model="currentTab"
          class="w-full h-full"
          direction="vertical"
          color="red">
          <v-tab value="home">
            <NuxtLink to="/">
              <div>Home</div>
            </NuxtLink>
          </v-tab>
          <v-tab value="one">
            <NuxtLink to="/customers">
              <div>Customers</div>
            </NuxtLink>
          </v-tab>
          <v-tab value="two">
            <NuxtLink to="/inventory">
              <div>Inventory</div>
            </NuxtLink>
          </v-tab>
          <v-tab value="three">
            <NuxtLink to="/orders">
              <div>Orders</div>
            </NuxtLink>
          </v-tab>
        </v-tabs> -->

        <!-- <div class="flex-col flex">
          <NuxtLink to="/"
            ><button :class="`${isHome ? 'bg-primary' : ''}`">
              Home
            </button></NuxtLink
          >
          <NuxtLink to="/customers"><button>Customer</button></NuxtLink>
          <NuxtLink to="/inventory"><button>Inventory</button></NuxtLink>
          <NuxtLink to="/orders"><button>Orders</button></NuxtLink>
        </div> -->

        <div class="flex-col flex">
          <div v-for="tab in tabArray">
            <NuxtLink :to="`/${tab.tabName === 'home' ? '' : tab.tabName}`">
              <button
                v-on="tab.active"
                :class="`${tab.active ? 'bg-primary' : ''}`"
                @click="tabCLicked(tab.tabName)">
                {{ tab.tabName }}
              </button>
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

      <slot />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsInstance } from "element-plus";
const isPanelHovered = ref(false);

const tabPosition = ref<TabsInstance["tabPosition"]>("left");

const currentTab = ref("");

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
        console.log(route.name);
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

function handleMouseEnter() {
  isPanelHovered.value = true;
}
function handleMouseLeave() {
  isPanelHovered.value = false;
}
</script>

<style>
html {
  overflow: auto;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
