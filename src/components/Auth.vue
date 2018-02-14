<template>
    <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form @submit.prevent="SignUp">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex xs12 sm-12>
                                                    <v-btn
                                                        id="twitter-btn"
                                                        @click="signin">
                                                        <v-icon>fa-twitter</v-icon>
                                                        &nbsp; Sign Up with Twitter
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                            
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
                                            <v-btn type="submit">
                                                SignUp
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                    
                                </form>
    
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
            error: ''
        }
    },

    computed: {
        comparePasswords () {
            return this.password != this.confirmpassword ? 'Passwords do not match' : ''
        }
    },
    methods: {
        SignUp () {
            console.log ({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })
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
