<template>
    <v-container>
        <v-flex xs4 offset-xs8>
            <v-btn 
                id="logout-btn"
                @click="logout">
                Logout
            </v-btn>
        </v-flex>

        <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex xs12 sm12>
                                                    <v-text-field
                                                        name="question"
                                                        label="Question"
                                                        id="question"
                                                        v-model="poll.question"
                                                        type="text"
                                                        multi-line
                                                        class="input-group--focused"
                                                        required>
                                                    </v-text-field>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row 
                                        v-for="choice in poll.choices" 
                                        :key="choice.key">
                                        <v-flex xs12>
                                            <v-layout row 
                                                v-show="choice.cleared">
                                                <v-flex xs12 sm12>
                                                    <v-text-field
                                                        name="choice"
                                                        label="Choice"
                                                        id="choice1"
                                                        v-model="choice.value"
                                                        type="text"
                                                        required>
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs2> 
                                                    <v-btn flat icon 
                                                        color="pink"
                                                        @click="clearChoice(choice)">
                                                        <v-icon>clear</v-icon>
                                                    </v-btn>
                                                    
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                    
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex xs2 offset-xs11 sm2 offset-sm11>
                                                    <div>
                                                         <v-btn fab small
                                                            @click="addChoice">
                                                            <v-icon >add</v-icon>
                                                        </v-btn>
                                                    </div>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row wrap>                                               
                                                <v-flex xs11 sm5>
                                                    <v-dialog
                                                        persistent
                                                        v-model="modal"
                                                        lazy
                                                        full-width
                                                        width="290px">

                                                        <v-text-field
                                                            slot="activator"
                                                            label="Picker in dialog"
                                                            v-model="date"
                                                            prepend-icon="event"
                                                            readonly
                                                        ></v-text-field>
                                                        <v-date-picker v-model="date" scrollable actions>
                                                        <template slot-scope="{ save, cancel }">
                                                            <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                                            </v-card-actions>
                                                        </template>
                                                        </v-date-picker>
                                                    </v-dialog>
                                                </v-flex>

                                                <v-spacer></v-spacer>

                                                <v-flex xs11 sm5>
                                                    <v-dialog
                                                        persistent
                                                        v-model="modal2"
                                                        lazy
                                                        full-width
                                                        width="290px">

                                                        <v-text-field
                                                        slot="activator"
                                                        label="Picker in dialog"
                                                        v-model="time"
                                                        prepend-icon="access_time"
                                                        readonly
                                                        ></v-text-field>
                                                        <v-time-picker v-model="time" actions>
                                                        <template slot-scope="{ save, cancel }">
                                                            <v-card-actions>
                                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                                            <v-btn flat color="primary" @click="save">Save</v-btn>
                                                            </v-card-actions>
                                                        </template>
                                                        </v-time-picker>
                                                    </v-dialog>
                                                </v-flex>

                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex text-md-center text-xs-center >
                                                    <div>
                                                         <v-btn color="primary"
                                                            @click="createPoll">
                                                            Create Poll
                                                        </v-btn>
                                                    </div>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-flex>
        </v-layout>
                                    <pre>
                                        {{ $data }}
                                    </pre>
                                    <p>{{ getdate }}</p>
                                    <p>{{ getmoment }}</p>
                                    <p>{{ momentnow }}</p>
                                    <p>{{ getunixdate }}</p>
    </v-container>

</template>

<script>
import firebase from 'firebase';
import { config } from '../firebaseconfig'
import * as moment from 'moment'

export default {
    data () {
        return {
            poll: {
                question: 'We would like to know the particular housemate/s that you would be voting for to remain in the Big Brother house for this week. Indicate by selecting the team/s let know...',

                choices:[{
                    value: 'Choice 1',
                    cleared: true
                }],
            },
            date: null,
            menu: false,
            modal: false,
            time: null,
            menu2: false,
            modal2: false
        }
    },

    computed: {
        momentnow () {
            return moment().unix()
        },
        getdate () {
            let polldate = this.date
            let polltime = this.time
            let date_time = polldate + polltime
            return date_time
        },
        getmoment () {
            let moment_time = moment(this.getdate, 'YYYY-MM-DD HH:mm').toDate()
            let mmtime = this.expiration_time = moment_time
            let getMTime = mmtime.getTime()
            return getMTime
        },
        getunixdate () {
            return this.getmoment - this.momentnow
        }
    },
   
    methods: {
        logout () {
            firebase.auth().signOut()
                .then(() => {
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addChoice () {
            this.poll.choices.push({ value: '', cleared: true });
        },
        
        createPoll () {
            console.log({ 
                question: this.poll.question, 
                choices: this.poll.choices, 
                expiration: this.getmoment 
            })
        },

        clearChoice (choice) {
            const choiceIndex = this.poll.choices.indexOf(choice)
            this.poll.choices.splice(choiceIndex, 1)            
        }
    }

}
</script>


<style scoped>

</style>
