<template>
  <div>
    <el-button>This is a button</el-button>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style></style>
