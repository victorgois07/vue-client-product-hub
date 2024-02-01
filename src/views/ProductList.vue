<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Lista de Produtos</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="addProduct">Adicionar Produto</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="products" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editProduct(item)" icon="mdi-pencil">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import db from '@/database'
import type { Header, Product } from '@/types'

export default {
  name: 'ProductList',
  data(): { products: Product[]; headers: Header[] } {
    return {
      products: [],
      headers: [
        { text: 'Nome do Produto', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions', sortable: false }
      ]
    }
  },
  async created() {
    await this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      this.products = await db.products.toArray()
    },
    async addProduct() {
      const newProduct: Product = {
        name: '',
        status: ''
      }
      await db.products.add(newProduct)
      await this.fetchProducts()
    },
    async editProduct(product: Product) {
      if (product.id) {
        await db.products.update(product.id, {
          name: '',
          status: product.status === 'Ativo' ? 'Inativo' : 'Ativo'
        })
        await this.fetchProducts()
      }
    },
    async deleteProduct(product: Product) {
      if (product.id) {
        await db.products.delete(product.id)
        await this.fetchProducts()
      }
    }
  }
}
</script>
@/types
