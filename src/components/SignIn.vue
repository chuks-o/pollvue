<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed"
                    :text="error.message">
                </app-alert>
            </v-flex>
        </v-layout>

        <!-- <v-layout row v-show="loading">
            <v-flex text-xs-center text-sm-center>
                <h2>loading...</h2>
            </v-flex>
        </v-layout> -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-layout row>
                                    <v-flex text-sm-center text-xs-center>
                                        <v-icon>lock_open</v-icon>
                                        <h1>LOGIN</h1>
                                    </v-flex>
                                </v-layout><br>

                                <form @submit.prevent="SignIn">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="email"
                                                label="Email"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    
                                    <v-layout row>
                                        <v-flex text-xs-center text-sm-center>
                                            <v-btn type="submit"
                                                :disabled="!formIsValid"
                                                color="secondary">
                                                LOGIN
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form><br><br>

                                <v-layout row>
                                    <v-flex text-xs-center text-sm-center>
                                        <router-link to="/auth">
                                            <p>Create an account with us, IT'S FREE!</p>
                                        </router-link>
                                    </v-flex>
                                </v-layout>
    
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase';
import { config } from '../firebaseconfig'

export default {
    data () {
        return {
            email: '',
            password: '',
        }
    },

    computed: {
        formIsValid () {
            return this.email != '' && this.password != ''
        },
        user () {
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        },
        loading () {
            return this.$store.getters.loading
        }
    },

    watch: {
        user (value) {
            if (value != null && value != undefined) {
                return this.$router.push('/create')
            }
        }
    },

    methods: {
        SignIn () {
            this.$store.dispatch('SignInUser', { 
                email: this.email,
                password: this.password,
                loading: this.loading 

            })
        },
        onDismissed () {
            this.$store.dispatch('clearError')
        }
    }

  
}
</script>

<style scoped>
h1 {
    color: brown;
    font-weight: 100;
    font-size: 30px;
}

</style>
