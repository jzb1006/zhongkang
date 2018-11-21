<template>
    <div>
        <menuListT @closeMenu=close :menuList=menuList></menuListT>
    </div>
</template>

<script>
import apiCommon from "@/api/common";
import menuListT from "@/templates/decorate/menu_list";
export default {
    components: {
        menuListT
    },
    data(){
        return{
            menuList:[]
        }
    },
    methods: {
        getData() {
            var self = this;
            apiCommon
                .ajaxSearch("container", "top_channel", { id: 1 })
                .then(res => {
                    self.menuList = res.data.data;
                    this.sort_asc();
                });
        },
        //----排序：start----
        sort_asc() {
            this.menuList.sort(this.sortId);
        },
        sortId(a, b) {
            return a.sort - b.sort;
        },
        //----排序：end----
        close(){
            this.$emit("closeMenu");
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style>
</style>
