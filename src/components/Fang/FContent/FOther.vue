<template>
    <div class="container">
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    name:"FOther",
    data(){
        return {
        }
    },
    components:{

    },
    mounted(){
        this.$store.dispatch('Content_Type',true);
    }
}
</script>

<style scoped>
        .container{
            /* margin-top: 10rem; */
            margin-bottom: 4rem;
        }
    input{
        opacity: 1;
        position: relative;
        top: .5rem;
        left: -1.5rem;
        width: 1rem;
        height: 1rem;
    }
    .active{
        background: #000;
    }
    .container>div{
        margin-bottom: 1.6rem;
    }
    .container>div>p{
        text-align: center;
        font-size: .8rem;
    }
    .container1 div{
        height: 1rem;
        width:6rem;
    }
    .container2 p{
        width: 7rem;
        font-size: .6rem
    }
</style>


