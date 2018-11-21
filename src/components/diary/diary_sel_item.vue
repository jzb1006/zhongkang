<template>
    <div>
        <diarySelItemC :itemList=itemList :itemList1=itemList1></diarySelItemC>
    </div>

</template>

<script>
import api from "@/api/diary";
import diarySelItemC from "@/templates/diary/diary_sel_item";
export default {
    components:{
        diarySelItemC
    },
    props: {
        itemList1: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            itemList: []
        };
    },
    methods: {
        $_ajax_getItem() {
            var self = this;
            api.ajaxSearch("diary_create_basic").then(res => {
                self.itemList = res.data;
            });
        }
    },
    mounted() {
        this.$_ajax_getItem();
    }
};
</script>

<style>
</style>
