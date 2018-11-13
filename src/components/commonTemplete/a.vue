<template>
<div>
<component v-for="(item,index) in params" :key="index" :parameter="item.parameter" v-show="true" :is="item.name"></component>
</div>
</template>
<script>
import Vue from "vue";
export default {
    data() {
        return {
            params:[
                {sort:1,},
                {sort:3},
                {sort:2}
            ]
        };
    },
    methods:{
        sort_array(){}
    }
};
</script>