<template>
  <v-app id="inspire">
    <v-slide-y-transition mode="out-in">
      <component v-bind:is="layout"></component>
    </v-slide-y-transition>
  </v-app>
</template>

<script>
import SimpleLayout from '@/components/dynamic/SimpleLayout'
import AppLayout from '@/components/dynamic/AppLayout'

export default {
  name: 'App',
  components: {
    'simple-layout': SimpleLayout,
    'app-layout': AppLayout
  },

  computed: {
    layout () {
      return this.$store.getters.layout
    }
  }
}
</script>
