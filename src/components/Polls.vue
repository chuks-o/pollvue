<template>
    <v-container>
        <v-layout row v-show="loading">
            <v-flex text-sm-center text-xs-center class="bounce-flex">
                <bounce-loader :loading="loading" :color="color"></bounce-loader>
            </v-flex>
        </v-layout>
        <v-layout row v-for="poll in polls" :key="poll.id" mb-3>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-media :src="poll.imageUrl" 
                        :height="poll.imageUrl ? '200px': ''">
                    </v-card-media>
                    <v-card-title primary-title text-sm-center text-xs-center>
                        <div class="">
                            <h3 class="mb-0 poll-question">{{ poll.question }}</h3>
                        </div>
                    </v-card-title>
                    <v-card-actions class="grey lighten-4" >
                        <v-btn flat color="orange"
                            class="red"
                            @click="onLoadPoll(poll.id)">
                            Vote
                        </v-btn>
                        <v-spacer></v-spacer>
                        <p>22 hours left</p>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as firebase from "firebase";                           
import { mapGetters } from 'vuex';

export default {
    name: 'Polls',
    data() {
        return {
            height: 200,
            color: '#7aabe6'
        }
    },

    created () {
        this.loadPolls()
    },

    computed: {
        ...mapGetters({
            user: 'user',
            polls: 'userPolls',
            loading: 'loading'
        }),
        
        imageHeight() {
            if ((this.polls.imageUrl = "")) 
                return (this.height = 0);
            else return this.height;
        },

        somePoll () {
            return this.polls.length > 0
        }
    },

    beforeMount () {
        this.setLayout()
    },

    methods: {
        setLayout () {
            this.$store.commit('SET_LAYOUT', 'app-layout')
        },
        onLoadPoll (id) {
            this.$store.dispatch('loadPoll', id).then((response) => {
                this.$router.replace({ name:'Poll', query:{id: id} })
            })
        },

        loadPolls () {
            this.$store.dispatch('loadPolls')
        }
    }
}
</script>

<style scoped>
.bounce-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
}

.poll-question {
    font-weight: 600px;
}
</style>


