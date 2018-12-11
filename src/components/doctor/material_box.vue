<template>
    <div>
        <TMaterialBox :doc_id="parseInt(doc_id)" title="医生素材" :links="{'router':'container','query':{id:params['container_id'],doc_id:doc_id}}" :isMore=is_more :number="params['number']"></TMaterialBox>
    </div>
</template>

<script>
import TMaterialBox from "@/templates/hospital/material_box.vue";
import { mixin } from "@/assets/js/mixins";
export default {
    data() {
        return {
            doc_id: this.$route.query.doc_id,
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
