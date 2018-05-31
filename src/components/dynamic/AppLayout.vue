<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      temporary
      v-model="drawer"
      app>
      <v-toolbar>
        <v-list dense class="pt-0">
          <v-list-tile avatar v-if="userIsAuthenticated">
              <v-list-tile-avatar>
                <img :src="userDetails[0].photoURL" v-if="this.userDetails">
                <img src="https://randomuser.me/api/portraits/men/85.jpg" v-else>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ user.email || userDetails[0].displayName }}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-toolbar>

        <v-list dense class="pt-0">
          <v-divider></v-divider>
          <v-list-tile v-for="menu in menuItems"
            :key="menu.items"
            :to="menu.link">
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list dense class="pt-0">
          <v-list-tile @click="logout" v-if="userIsAuthenticated">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar> 

    <v-content>
      <router-view/>
    </v-content>

    <v-footer app>
      <span class="">&copy; 2018 PollVue</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      title: 'PollVue',
      drawer: null,
    }
  },

  name: 'App',
  methods: {
    logout () {
      this.$store.dispatch('logout').then(res => {
        this.$router.push('/signin')
      })
    }
  },

  computed: {
    menuItems () {
      let menuItems =  [
        {icon: 'face', title: 'SignUp', link: '/auth'},
        {icon: 'lock_open', title: 'SignIn', link: '/signin'},
      ]

      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'add', title: 'JoinPoll', link: '/join'},
          {icon: 'event', title: 'Polls', link: '/polls'},
          {icon: 'today', title: 'Create Poll', link: '/create'},
          {icon: 'person', title: 'Profile', link: '/profile'},
        ]
      }
      return menuItems
    },

    userIsAuthenticated () {
      return this.$store.getters.user != null && this.$store.getters.user != undefined
    },
    user () {
      return this.$store.getters.user
    },
    userDetails () {
      return this.user.userDetails
    }
  }
}
</script>
