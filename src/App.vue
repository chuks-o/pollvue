<template>
  <v-app>
    <!-- <v-toolbar app></v-toolbar> -->
    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm6>
                  &copy; 2018 PollVue. 
                </v-flex>
            </v-layout>
      </v-container> 
      
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  name: 'App'
}
</script>
