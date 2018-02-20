<template>
    <v-container>
        <v-layout row>
            <v-flex text-md-center text-sm-center text-xs-center>
                <div v-show="expiration">
                    <h4>Your Poll has expired</h4>
                </div>
                <!-- <div v-show="! expiration">
                    <p>
                        <span>Days: {{ days }}</span> &nbsp;
                        <span>Hours: {{ hours }}</span> &nbsp;
                        <span>Min: {{ minutes }}</span> &nbsp;
                        <span>Secs: {{ seconds }}</span>

                    </p>
                </div>  -->
            </v-flex>

        </v-layout>

        <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-layout row>
                                <v-flex text-sm-center text-xs-center> 
                                    <h2>Create a Poll</h2>
                                </v-flex>
                            </v-layout><br>
                            <v-divider></v-divider><br>

                            <v-container>
                                <form @submit.prevent="createPoll">
                                    <v-layout row>
                                        <v-flex xs12 md12>
                                            <v-layout row>
                                                <v-flex xs12 md12 sm12>
                                                    <v-text-field
                                                        name="question"
                                                        label="Question"
                                                        id="question"
                                                        v-model="poll.question"
                                                        type="text"
                                                        multi-line
                                                        rows="3"
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
                                                <v-flex xs11 sm11>
                                                    <v-text-field
                                                        name="choice"
                                                        label="Choice"
                                                        id="choice1"
                                                        v-model="choice.value"
                                                        type="text"
                                                        multi-line
                                                        rows="1"
                                                        required>
                                                    </v-text-field>
                                                </v-flex>
                                                <v-flex xs1 sm1> 
                                                    <v-btn flat icon 
                                                        color="pink"
                                                        @click="clearChoice(choice)">
                                                        <v-icon>clear</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                    
                                    <v-layout row v-show="!endOfChoice">
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
                                        <v-flex class=" xs11 sm11 text-xs-center text-sm-center text-md-center text-lg-center">
                                            <img :src="imageUrl" height="170" v-if="imageUrl"/>
                                            <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                                            <input
                                                type="file"
                                                style="display: none"
                                                ref="image"
                                                accept="image/*"
                                                @change="onFilePicked"
                                            >
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
                                                            label="Select expiration date"
                                                            v-model="date"
                                                            prepend-icon="event"
                                                            readonly
                                                            required
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
                                                        label="Select expiration time"
                                                        v-model="time"
                                                        prepend-icon="access_time"
                                                        readonly
                                                        required
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
                                        <v-flex>
                                            <div v-show="error">
                                                <span> {{ error }}</span>
                                            </div>

                                        </v-flex>
                                    </v-layout><br>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-layout row>
                                                <v-flex text-md-center text-xs-center >
                                                    <div>
                                                         <v-btn 
                                                            type="submit"
                                                            large>
                                                            Create Poll
                                                        </v-btn>
                                                    </div>
                                                    <!-- <div>
                                                        <v-btn color="primary"
                                                            @click="checkExpiration">
                                                            Check
                                                        </v-btn>
                                                    </div> -->
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </form>
                            </v-container>
                        </v-card-text>
                                    <!-- <pre>
                                        {{ $data }}
                                    </pre>
                                   
                                    <p>{{ momentnow }}</p> 
                                    <p>{{ checkTime }}</p> -->
                    </v-card>
                </v-flex>
        </v-layout>
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
                question: 'What will you be doing today?',

                choices:[{
                    value: 'Choice 1',
                    cleared: true
                }],
                
            },

            error: '',
            imageUrl: '',
            imageName: '',
            date: null,
            menu: false,
            modal: false,
            time: null,
            menu2: false,
            modal2: false,
            expiration: false,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },

    computed: {
        momentnow () {
            return moment().format()
        },
        
        getdate () {
            let polldate = this.date
            let polltime = this.time
            let date_time = polldate + polltime
            return date_time
        },
        getmoment () {
            let moment_time = moment(this.getdate, 'YYYY-MM-DD HH:mm:ss')
            return moment_time
        },
        getunixdiff () {
            return this.momentnow - this.getmoment

        },
        checkTime () {
            let moment_time = moment(this.getdate, 'YYYY-MM-DD HH:mm:ss:a').isAfter(moment())
            return moment_time
        },
        userPoll () {
            return this.$store.getters.userPoll
        },
        endOfChoice () {
            if (this.poll.choices[3])
            return true
        }
    },
   
    methods: {
        pickFile () {
            this.$refs.image.click()
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        
        addChoice () {
            this.poll.choices.push({ value: '', cleared: true });
        },
        
        createPoll () {
            const newPoll =  {
                question: this.poll.question,
                choices: this.poll.choices,
                date: this.date,
                time: this.time,
                imageUrl: this.imageUrl,
                imageName: this.imageName,    
                expiration: this.getmoment
            }
            this.$store.dispatch('createPoll', newPoll)
        },

        clearChoice (choice) {
            const choiceIndex = this.poll.choices.indexOf(choice)
            this.poll.choices.splice(choiceIndex, 1)            
        },

        checkExpiration () {
            this.error = ''
            let check = moment(this.getdate, 'YYYY-MM-DD HH:mm:ss:a').isAfter(moment())
            if (!check) {
                this.error = 'This date is not valid, pick a later date...'
                return false
            }

            let moment_time = moment(this.getdate, 'YYYY-MM-DD HH:mm:ss:a').valueOf()
            
            var x = setInterval(() => {
                let momentnow  = moment().valueOf()
                var getunixdiff = moment_time - momentnow 

                this.days = Math.floor(getunixdiff / (1000 * 60 * 60 * 24));
                this.hours = Math.floor((getunixdiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.minutes = Math.floor((getunixdiff % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds = Math.floor((getunixdiff % (1000 * 60)) / 1000);
                this.something = getunixdiff

                if (getunixdiff < 0) {
                    clearInterval(x)
                    this.expiration = true
                }
            }, 1000)

        }

    }

}
</script>


<style scoped>
h2 {
    color: brown;
    font-weight: 100;
    font-size: 30px;
}

</style>
