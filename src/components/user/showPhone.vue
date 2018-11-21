<template>
    <div id=showPhone>
        <div v-if="getUserinfo.mobile_phone!=''" class="current">
            <p>{{getUserinfo.mobile_phone}}</p>
            <p>当前手机号</p>
        </div>
        <div v-else class="current">
            <p>您未绑定手机号，请绑定</p> 
        </div>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapGetters([
                'getUserinfo'
            ]),
        },
    }
</script>
<style scoped>
    .current{
		font-size: 0.4rem;
		background:#abcdef;
		height:2.5rem;
		padding-top:0.8rem;
        text-align: center;
	}
</style>


