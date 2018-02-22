<template>
  <v-container>
    <v-layout row v-show="loading">
        <v-flex text-sm-center text-xs-center>
            <!-- <spinner></spinner> -->
        </v-flex>
    </v-layout>
     
    <v-layout row v-for="poll in polls" :key="poll.id" mb-3>
        <v-flex xs12 sm8 offset-sm2 >
            <v-card>
                <v-card-title>
                    <h3>{{ poll.question }}</h3>
                </v-card-title>
                <v-card-media :src="poll.imageUrl" 
                    :height="poll.imageUrl ? '200px': ''">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                    <!-- <h3 class="headline mb-0">{{ poll.question }}</h3> -->
                    <div>Poll expires {{ poll.expiration }}</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="orange">Stats</v-btn>
                    <v-btn flat color="orange">Share</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import * as firebase from "firebase";

export default {
    components: { Spinner },
    data() {
        return {
            height: 200
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        polls() {
            return this.$store.getters.userPolls;
        },
        loading() {
            return this.$store.getters.loading;
        },
        imageHeight() {
            if ((this.polls.imageUrl = "")) return (this.height = 0);
            else return this.height;
            
        }
    }
}
</script>

<style scoped>

</style>


