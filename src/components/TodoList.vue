<template>
    <v-container>
        <form @submit.prevent="addTodo">
            <v-layout row>
                    <v-flex xs4 sm4> 
                            <v-text-field
                                name="todo"
                                label="Task"
                                v-model="task"
                                type="text"
                                multi-line
                                rows="1"
                                required>
                            </v-text-field>
                    </v-flex>
                        <v-flex xs2 sm2> 
                            <v-btn 
                                type="submit"
                                color="secondary">
                                AddTodo
                            </v-btn>
                    </v-flex>
            </v-layout>
        </form>

        <v-layout>
            <v-flex>
                <div>
                    <todo :todos="todos"></todo> 
                </div>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import Todo from './Todo'

export default {
    data () {
        return {
            task: ''
        }
    },
    components: { Todo },
    computed: {
        todos () {
            return this.$store.getters.todos
        }
    },
    methods: {
        addTodo () {
            this.$store.commit('addTodo', this.task)
            this.task = ''

        }
    }
  
}
</script>

