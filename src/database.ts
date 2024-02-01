import Dexie, { type Table } from 'dexie'
import type { Client, Product } from './types'

class VueClientProductHubDB extends Dexie {
  products!: Table<Product, number>
  clients!: Table<Client, number>

  constructor() {
    super('VueClientProductHubDB')
    this.version(1).stores({
      products: '++id, name, status',
      clients: '++id, name, document, phone, email, status'
    })
    this.products = this.table('products')
    this.clients = this.table('clients')
  }
}

const db = new VueClientProductHubDB()

export default db
