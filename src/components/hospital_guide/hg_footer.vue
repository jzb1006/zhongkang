<template>
	<div id="FFooter">
		<div class="btn_operate">
			<div class="btn" @click="to_back()" :class="{vshow:!back}">
				<p class="prep">
					<span>上一步</span>
				</p>
			</div>
			<div class="btn" @click="next()" :class="{vshow:!next1}">
				<p class="bottom">
					<span>下一步</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Bus from "./../../assets/bus.js";

export default {
    name: "btn",
    data() {
        return {
            back: false,
            next1: true,
            pageNum: "1"
        };
    },
    computed: {},
    methods: {
        to_back(){
            Bus.$emit("Content_Type",parseInt(this.pageNum)-1);
        },
        next: function() {
            if (this.$store.state.fang.is_sel) {
                let content = this.$store.state.fang.contentJump;
                let contentData = this.$store.state.fang.contentData;
                this.$emit("changePage",content);
                Bus.$emit("Content_Type",parseInt(this.pageNum)+1);
                // this.$router.push({ path: content, query: contentData });
            } else {
                alert("请选择！！");
            }
        }
    },
    mounted() {
        Bus.$on("Content_Type", res => {
            this.pageNum = res;
            if (this.pageNum > 1 && this.pageNum <= 7) {
                this.back = true;
                this.next1 = true;
            } else if (this.pageNum == 1) {
                this.back = false;
                this.next1 = true;
            } else if (this.pageNum == 8) {
                this.back = true;
                this.next1 = false;
            } else {
                this.back = false;
                this.next1 = false;
            }
        });
    }
};
</script>

<style scoped>
#FFooter .btn_operate .vshow {
    visibility: hidden;
}
#FFooter {
    position: absolute;
    bottom: .3rem;
    left: 0;
    right: 0;
    padding: 0.1rem 0.3rem;
    background-color: #fff;
	z-index: 500;
}
#FFooter .btn_operate {
	font-size: .3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.2rem;
	text-align: center;
	
}
#FFooter .btn_operate .btn{
	padding: .1rem 0;
	border: 1px solid #72dacf;
}
</style>


