<template>
    <div>
        <h1>Create an event, {{ user.name}}</h1>
        <p> {{ user.id}}</p>
        <!--ul>
            <li v-for="cat in categories" :key="cat">{{cat}}</li>
        </ul-->
        <p> There are {{ getEvent(1) }} categories</p>
    </div>
</template>

<script>

import {mapState} from 'vuex'; //è un helper che serve a facilitare la creazione di computed properties
export default {
    //con mapState
    computed: {
        catLength(){
            return this.$store.getters.catLength
        },/*
        doneTodos: state =>{
            return state.todos.filter(todo = todo.done)
        },*/
        activeTodosCount: (state,getters) => {
            return state.todos.length - getters.doneTodos.length
        },
        getEvent(){
            return this.$store.getters.getEventById
        },
    
        /*
        mapState({
        //simplify way
        user: 'user',
        categories: 'categories'
        
        /* verbose way
        userName: state => state.user.name,
        userID: state => state.user.id,
        categories: state => state.categories
        */
        ...mapState(['user','categories'])

    }

    /* senza mapState
    computed:{
        userName(){
            return this.$store.state.user.name
        },
        userID(){
            return this.$store.state.user.id
        }
    }
    */
}
</script>

<style lang="scss" scoped>

</style>