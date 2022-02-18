<template>
    <div  v-html="introduction"></div>
</template>


<script>
export default {
    created(){
       
    },
    props:['introduction'],
    data(){
        return{

        }
    },
    watch:{
        introduction(n,o){
            
        }
    }
}
</script>