<script lang="ts">
import db from '@/database'
import type { Client, SnackbarData } from '@/types'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import { v4 as uuidv4 } from 'uuid'
import { onMounted, ref } from 'vue'
import type { VForm } from 'vuetify/components'
import CustomSnackbar from '../components/CustomSnackbar.vue'

export default {
  name: 'ClientList',
  components: {
    CustomSnackbar
  },
  methods: {
    async submitForm() {
      const form = this.$refs.form as VForm
      const validate = await form.validate()

      if (validate) {
        this.addClient()
        this.dialogAddClient = false
      }
    }
  },
  setup() {
    // Estado reativo
    const clients = ref<Client[]>([])
    const dialogAddClient = ref(false)
    const valid = ref(false)
    const newClient = ref({
      name: '',
      document: '',
      phone: '',
      email: '',
      status: 'Ativo'
    })

    const headers = [
      { text: 'Nome', value: 'name' },
      { text: 'Documento', value: 'document' },
      { text: 'Telefone', value: 'phone' },
      { text: 'E-mail', value: 'email' },
      { text: 'Status', value: 'status' },
      { text: 'Ações', value: 'actions', sortable: false }
    ]

    // Regras de validação
    const rules = {
      required: (value: string) => !!value || 'Obrigatório.',
      email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail inválido.',
      validateCPF: (value: string) => cpfValidator.isValid(value) || 'CPF inválido.'
    }

    // Métodos
    const fetchClients = async () => {
      clients.value = await db.clients.toArray()
    }

    const snackbar = ref({
      show: false,
      message: '',
      color: ''
    })

    function showSnackbar(data: SnackbarData) {
      snackbar.value = { ...data, show: true }
    }

    const addClient = async () => {
      try {
        console.log(newClient, newClient.value, 'newClient')
        await db.clients.add({ ...newClient.value, id: uuidv4() })
        clients.value.push(newClient.value)
        newClient.value = { name: '', document: '', phone: '', email: '', status: 'Ativo' }
        showSnackbar({
          message: 'Cliente adicionado com sucesso',
          color: 'success'
        })
      } catch (error) {
        console.error('Erro ao adicionar o cliente:', error)
        showSnackbar({
          message: 'Erro ao adicionar o cliente',
          color: 'error'
        })
      }
    }

    const editClient = async (client: Client) => {
      try {
        if (!client.id) throw new Error('Cliente sem ID válido')

        const updated = await db.clients.update(client.id, client)
        if (!updated) throw new Error('Falha ao atualizar o cliente')

        showSnackbar({
          message: 'Cliente atualizado com sucesso',
          color: 'success'
        })
        await fetchClients()
      } catch (error) {
        console.error('Erro ao editar o cliente:', error)
        showSnackbar({
          message: (error as Error)?.message || 'Erro ao editar o cliente',
          color: 'error'
        })
      }
    }

    const deleteClient = async (client: Client) => {
      try {
        if (!client.id) throw new Error('Cliente sem ID válido')

        await db.clients.delete(client.id)
        showSnackbar({
          message: 'Cliente removido com sucesso',
          color: 'success'
        })
        await fetchClients()
      } catch (error) {
        console.error('Erro ao remover o cliente:', error)
        showSnackbar({
          message: (error as Error)?.message || 'Erro ao remover o cliente',
          color: 'error'
        })
      }
    }

    onMounted(fetchClients)

    return {
      clients,
      dialogAddClient,
      newClient,
      valid,
      rules,
      addClient,
      editClient,
      deleteClient,
      snackbar,
      headers
    }
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Lista de Clientes</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="dialogAddClient = true">Adicionar Cliente</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="clients" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editClient(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteClient(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogAddClient" max-width="500px">
    <v-card>
      <v-card-title> Adicionar Novo Cliente </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Nome"
            v-model="newClient.name"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            label="Documento (CPF)"
            v-model="newClient.document"
            :rules="[rules.required, rules.validateCPF]"
            required
          ></v-text-field>
          <v-text-field
            label="Telefone"
            v-model="newClient.phone"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="newClient.email"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text="Cancelar" @click="dialogAddClient = false"></v-btn>
        <v-btn type="submit" color="green darken-1" text="Salvar" @click="submitForm"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <custom-snackbar :show="snackbar.show" :message="snackbar.message" :color="snackbar.color" />
</template>
