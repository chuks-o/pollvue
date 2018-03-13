<template>
    <v-list two-line subheader>
        <v-subheader class="grey lighten-3">Votes 
            <v-spacer></v-spacer>
            19 hours left
        </v-subheader>
        <!-- <p>{{ pollIndex }}</p> -->
        <v-list-tile v-for="choice in poll.choices" 
            :key="choice.value">
            <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ choice.value }}</v-list-tile-title>
                <!-- <v-list-tile-sub-title>45%</v-list-tile-sub-title> -->
            </v-list-tile-content>

            <v-list-tile-action>
                <span>
                    <v-btn icon ripple
                        @click="countChoice(choice)">
                        <v-icon color="grey lighten-1" :disabled="!counter">favorite</v-icon>
                    </v-btn>
                    {{ choice.count }}
                </span>
            </v-list-tile-action>
        </v-list-tile>
        <!-- {{ pollChoices }} -->
        <p>{{ selChoice }} </p>
    </v-list>
</template>


<script>
export default {
    props: ['id'],
    data () {
        return {
            counter: true,
            selChoice: ''
        }
    },
    computed: {
        poll () {
            return this.$store.getters.loadPoll(this.id)
        },
        pollChoices () {
            return this.$store.getters.loadPoll(this.id).choices
        },
        oneChoice () {
            return this.pollChoices.indexOf(choice)
        }
        // pollIndex () {
        //     this.pollArr = this.poll
        //         var value = this.pollArr.choices.forEach((choice) => {
        //             choice[0].value
        //         })
        //         return value
        // }
    },
    methods: {
        countChoice (selected) {
            selected.count += 1
            let payload = {
                id: this.id,
                count: selected.count
            }
            this.$store.dispatch('updateCount', payload)
        }
    }
  
}
</script>
