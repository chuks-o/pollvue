<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed"
                    :text="error.message">
                </app-alert>
            </v-flex>
        </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form @submit.prevent="SignUp">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex text-sm-center text-xs-center>
                                                    <v-btn
                                                        id="twitter-btn"
                                                        @click="signin">
                                                        <v-icon>fa-twitter</v-icon>
                                                        &nbsp; Sign Up with Twitter
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout><br>
                                            
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
                                        <v-flex xs12>
                                            <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirmPassword"
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[comparePasswords]"
                                                required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12 md4 offset-md5 >
                                            <v-btn  
                                                color="secondary"
                                                type="submit"
                                                :disabled="!formIsValid">
                                                SignUp
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form><br>

                                <v-layout row>
                                    <v-flex text-xs-center text-sm-center>
                                        <p>Already have an account?
                                            <router-link to="/signin">LOGIN</router-link>
                                            here
                                        </p>
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
            confirmPassword: '',
        }
    },

    computed: {
        comparePasswords () {
            return this.password != this.confirmpassword ? 'Passwords do not match' : ''
        },
        formIsValid () {
            return this.email != '' && this.password != '' && this.confirmPassword != ''
        },
        user () {
            return this.$store.getters.user
        },
        error () {
            return this.$store.getters.error
        }
    },

    watch: {
        user (value) {
            if (value != null && value != undefined) {
                return this.$router.push('/emailconfirm')
            }
        }

    },

    methods: {
        SignUp () {
            this.$store.dispatch('registerUser', {
                email: this.email,
                password: this.password
            })
            
        },

        signin () {
            var provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithRedirect(provider);

            firebase.auth().getRedirectResult().then(result => {
                return result
                
            }).then(result => {
                console.log(result)
                this.$router.push('/create')
            }).catch(err => {
                this.error = err
            });
        },
        onDismissed () {
            this.$store.dispatch('clearError')
            console.log('error displayed')
        }
    }

  
}
</script>

<style scoped>
#twitter-btn {
    background: #1dcaff;
    color:white;
}

</style>
