<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on"> Button 1 </v-btn>
          </template>
          <span>Tooltip for Button 1</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="4">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn color="secondary" v-bind="attrs" v-on="on"> Button 2 </v-btn>
          </template>
          <span>Tooltip for Button 2</span>
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="4">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on"> Button 3 </v-btn>
          </template>
          <span>Tooltip for Button 3</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// No additional script needed for basic tooltip functionality
</script>

<style scoped>
/* Add any custom styles here */
</style>
