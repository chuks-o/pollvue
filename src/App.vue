<template>
  <v-app>
    <!-- <v-navigation-drawer app temporary v-model="sideNav">
      <v-toolbar app>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            to="/">
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Home</v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            to="/">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>Logout</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
    </v-navigation-drawer> -->

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar> 

    <v-content>
      <router-view/>
    </v-content>
    
    <v-footer app>
      <v-container>
            <v-layout row>
                <v-flex text-md-center text-xs-center text-sm-center>
                  &copy; 2018 PollVue. 
                </v-flex>
            </v-layout>
      </v-container> 
    </v-footer>

  </v-app>
  
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      title: 'PollVue',
      dialog: false,
      sideNav: false
    }
  },
  name: 'App',
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
          this.$router.push('/')
      })
      .catch(err => {
          console.log(err)
      })
    }
  }
}
</script>
