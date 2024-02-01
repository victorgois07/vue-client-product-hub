<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>VueClientProductHub</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text="Home" to="/"></v-btn>
      <v-btn text="Produtos" to="/products"></v-btn>
      <v-btn text="Clientes" to="/clients"></v-btn>
      <v-btn text="Associação" to="/associate"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer color="primary" app>
      <span class="white--text">&copy; 2024 VueClientProductHub</span>
    </v-footer>
  </v-app>
</template>

<style>
.v-footer {
  text-align: center;
}
</style>
