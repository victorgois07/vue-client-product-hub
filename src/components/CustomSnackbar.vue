<template>
  <v-snackbar v-model="internalShow" :color="color" :timeout="timeout" bottom right>
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
export default {
  name: 'CustomSnackbar',
  data() {
    return {
      isClose: false
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'success'
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    internalShow: {
      get() {
        if (this.show) {
          this.show && this.isClose
        }

        return this.show
      },
      set(value: boolean) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    closeSnackbar() {
      setTimeout(() => {
        this.isClose = false
      }, 5000)
    }
  }
}
</script>
