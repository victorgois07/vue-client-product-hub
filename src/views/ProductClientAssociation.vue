<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Associação de Produtos aos Clientes</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          :items="clients"
          item-text="name"
          item-value="id"
          label="Selecione um Cliente"
          v-model="selectedClientId"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="showProductAssociationDialog">Associar Produto</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title> Associe Produtos ao Cliente Selecionado </v-card-title>
        <v-card-text>
          <v-select
            v-model="selectedProducts"
            :items="products"
            item-text="name"
            item-value="id"
            label="Selecione Produtos"
            multiple
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text="Associar" @click="associateProducts"></v-btn>
          <v-btn color="red darken-1" text="Cancelar" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import db from '@/database'
import type { ProductClientAssociationData } from '@/types'

export default {
  name: 'ProductClientAssociation',
  data(): ProductClientAssociationData {
    return {
      clients: [],
      selectedClientId: null,
      dialog: false,
      selectedProducts: [],
      products: []
    }
  },
  async created() {
    await this.fetchClients()
    await this.fetchProducts()
  },
  methods: {
    async fetchClients() {
      this.clients = await db.clients.toArray()
    },
    async fetchProducts() {
      this.products = await db.products.toArray()
    },
    showProductAssociationDialog() {
      if (this.selectedClientId) {
        this.dialog = true
      } else {
        alert('Por favor, selecione um cliente.')
      }
    },
    async associateProducts() {
      this.dialog = false
    }
  }
}
</script>
