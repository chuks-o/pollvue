<template>
    <v-container>
        <v-layout row>
            <v-flex xs6 offset-xs3 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-layout row>
                            <v-flex text-sm-center text-xs-center>
                                <h1>345873</h1>
                            </v-flex>
                        </v-layout>
                        <form>
                            <v-layout row>
                                <v-flex xs12 md12>
                                    <v-layout row>
                                        <v-flex xs12 md12 sm12>
                                            <v-text-field
                                                name="joinpoll"
                                                label="Join Poll"
                                                type="text"
                                                class=""
                                                required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex text-sm-center text-xs-center>
                                    <v-btn dark 
                                        color="green"
                                        type="submit">Join poll</v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                    </v-card-text>                     
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container>
  
</template>


<script>
export default {
  
}
</script>
