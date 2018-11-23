<template>
    <div>
        <TMaterialBox :ins_id="parseInt(ins_id)" title="商家素材" :links="{'router':'container','query':{id:params['container_id'],ins_id:ins_id}}" :isMore=is_more :number="params['number']"></TMaterialBox>
    </div>
</template>

<script>
import TMaterialBox from "@/templates/hospital/material_box.vue";
import { mixin } from "@/assets/js/mixins";
export default {
    data() {
        return {
            ins_id: this.$route.query.ins_id,
            is_more: parseInt(this.params.is_more)
        };
    },
    mixins: [mixin],
    components: {
        TMaterialBox
    }
};
</script>

<style>
</style>
