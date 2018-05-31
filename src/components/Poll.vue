<template>
    <v-container>
        <v-layout row v-show="loading">
            <v-flex text-sm-center text-xs-center class="bounce-flex">
                <bounce-loader :loading="loading" :color="color"></bounce-loader>
            </v-flex>
        </v-layout>
     
        <v-layout row mb-3>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-media :src="poll.imageUrl" 
                        :height="poll.imageUrl ? '250px': ''">
                    </v-card-media>
            
                    <v-card-title primary-title>
                        <div>
                            <h3 class=" mb-0 poll-question" >
                                {{ poll.question }}
                            </h3>
                        </div>
                            <v-spacer></v-spacer>
                        <div>
                            <!-- Twitter share button -->
                            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" 
                                class="twitter-share-button" 
                                data-size="large" 
                                data-text="Hey, I have just created a poll on PollVue, You can join this poll now by clicking on this link." 
                                data-hashtags="PollVue" data-related="" data-show-count="false">
                                Tweet
                            </a>
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>

                    <!-- Voting component -->
                    <voting :id="id" :poll="poll"></voting>
                    <!-- Voting Component -->
                </v-card>
                
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Voting from '@/components/Voting'

export default {
    props: ['id'],
    components: { Voting },
    data () {
        return {
            height: 200,
            color: '#7aabe6',
            pollArr: []        
        }
    },
    created () {
        this.getPoll()
        // Twitter share button
        let twitter = document.createElement('script');    
        twitter.setAttribute('src',"https://platform.twitter.com/widgets.js");
        twitter.setAttribute('charset',"utf-8")
        document.head.appendChild(twitter);
    },
    computed: {
        ...mapGetters([
            'loading',
            'poll'
        ]),
       
        imageHeight () {
            if ((this.polls.imageUrl = "")) {
                return (this.height = 0);
            } 
            else return this.height;    
        }
    },
    
    beforeMount () {
        this.setLayout()
    },

    methods: {
        setLayout () {
            this.$store.commit('SET_LAYOUT', 'app-layout')
        },
        getPoll () {
            this.$store.dispatch('loadPoll', this.id)
        }
    }
  
}
</script>

<style scoped>
.poll-question {
    font-weight: 600;
}

</style>
