<template>
  <v-container>
    <v-layout row>
        <v-flex>
            <ul>
                <li v-for="t in todos" 
                    :key="t.id"
                    :class="{ completed: t.completed }"
                    @click="toggleTodo(t.id)"
                    @dblclick="deleteTodo(t.id)">
                    {{ t.task }}
                </li>
            </ul>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    props: ['todos'],
    methods: {
        toggleTodo (id) {
            this.$store.commit('toggleTodo', id)
        },
        deleteTodo (id) {
            this.$store.commit('deleteTodo', id)
        }
    }
  
}
</script>


<style scoped>
.completed {
    color: red;
    text-decoration: line-through;
}
</style>


