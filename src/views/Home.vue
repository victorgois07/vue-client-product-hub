<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1>Bem-vindo ao VueClientProductHub</h1>
        <p>Este é o seu ponto de partida para gerenciar clientes e produtos de forma eficiente.</p>
        <v-btn color="primary" to="/products">Ver Produtos</v-btn>
        <v-btn color="secondary" to="/clients">Ver Clientes</v-btn>
        <v-btn color="success" to="/associate">Associar Produtos e Clientes</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.home p {
  margin-bottom: 1em;
}
</style>
