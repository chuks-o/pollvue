<template>
    <v-container id="mail-container">
        <v-layout row>
            <v-flex text-sm-center text-xs-center>
                <v-card>
                    <v-card-text>
                        <v-layout row>
                            <v-flex text-sm-center text-xs-center>
                                <h1>{{ header }}</h1>
                            </v-flex>
                        </v-layout>

                        <v-layout row>
                            <v-flex text-sm-center text-xs-center>
                                <h4>{{ msg }}</h4>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            header: 'PollVue',
            msg: 'A mail has been sent to you, kindly follow the link to confirm your email address'
        }
    }
  
}
</script>


<style scoped>
#mail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
}

h1 {
    color: brown;
    font-weight: 100;
    font-size: 50px;
}
h4 {
    font-weight: 300;
}
</style>


