<template>
	<div id="disease_db">
		<topBackTitle :params="params"></topBackTitle>
		<button-tab v-model="sel_tab">
        	<button-tab-item @on-item-click="sel_cate()">典型人群</button-tab-item>
        	<button-tab-item @on-item-click="sel_cate()">科室分类</button-tab-item>
      	</button-tab>
  	    <div class="disease_list clearfix" v-if="sel_tab == 0">
            <div class="level_first" :style="{height:w_height+'px'}"> 
                <div v-for="(m,index) in mass" :key="index" class="disease_position_wrapper" :class="{active:level_first_sel_index == index}" @click="level_first_index(index,m.id)">
                    <div class="icon">
                        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1175099016,3725260152&fm=26&gp=0.jpg" alt="">
                    </div>
                    <p>{{m.mass_description}}</p>
                </div>
            </div>
            <div class="level_second" :style="{height:w_height+'px'}">
                <p class="disease" v-for="(disease,index) in mass_disease[mass_id]" :key="index">
                    <span>{{disease.disease_name}}</span>
                </p>
            </div>
        </div>
        <div class="disease_list clearfix" v-else>
            <div class="level_first" :style="{height:w_height+'px'}"> 
                <div v-for="(m,index) in department" :key="index">
                	<div v-for="(d,index) in m.d_id" :key="index" class="disease_position_wrapper" :class="{active:level_first_sel_index == index}" @click="level_first_index(index,m.id)">
                		<div class="icon" >
	                        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1175099016,3725260152&fm=26&gp=0.jpg" alt="">
	                    </div>
	                    <p>{{d.department_name}}</p>
                	</div>
                </div>
            </div>
            <div class="level_second" :style="{height:w_height+'px'}">
                <p class="disease" v-for="(disease,index) in department_disease[department_id]" :key="index">
                    <span>{{disease.disease_name}}</span>
                </p>
            </div>
        </div>
	</div>
</template>
<script>
	import { ButtonTab, ButtonTabItem } from 'vux'
	export default {
		props:{
			disease_db:{
				default:function(){
					return {}
				}
			}
		},
		components: {
		    ButtonTab,
		    ButtonTabItem
		},
		data(){
			return{
				sel_tab:0,
				params:{
					title:"疾病库"
				},
				w_height:812,
	            symptom_status:true,
	            level_first_sel_index:0,
	            mass_id:1,
	            department_id:1,
	            mass:[
	            	{
	            		id:"1",
	            		mass_name:"上班族",
	            	},
	            	{
	            		id:"2",
	            		mass_name:"男性",
	            	},
	            	{
	            		id:"3",
	            		mass_name:"女性",
	            	},
	            	{
	            		id:"4",
	            		mass_name:"老人",
	            	},
	            	{
	            		id:"5",
	            		mass_name:"儿童",
	            	},
	            	{
	            		id:"6",
	            		mass_name:"女性",
	            	},
	            	{
	            		id:"7",
	            		mass_name:"老人",
	            	},
	            	{
	            		id:"8",
	            		mass_name:"儿童",
	            	}
	            ],
	            mass_disease:{
	            	"1":[
	            		{
	            			id:"1",
	            			disease_name:"青春痘"
	            		},
	            		{
	            			id:"2",
	            			disease_name:"分含感冒"
	            		},
	            		{
	            			id:"3",
	            			disease_name:"咳嗽"
	            		},
	            		{
	            			id:"4",
	            			disease_name:"脱发"
	            		},
	            	],
	            	"2":[
	            		{
	            			id:"5",
	            			disease_name:"青春痘2"
	            		},
	            		{
	            			id:"6",
	            			disease_name:"分含感冒2"
	            		},
	            		{
	            			id:"7",
	            			disease_name:"咳嗽2"
	            		},
	            		{
	            			id:"8",
	            			disease_name:"脱发2"
	            		},
	            	],
	            	"3":[
	            		{
	            			id:"9",
	            			disease_name:"青春痘3"
	            		},
	            		{
	            			id:"10",
	            			disease_name:"分含感冒3"
	            		},
	            		{
	            			id:"11",
	            			disease_name:"咳嗽33"
	            		},
	            		{
	            			id:"12",
	            			disease_name:"脱发3"
	            		},
	            	],
	            	"4":[
	            		{
	            			id:"13",
	            			disease_name:"青春痘4"
	            		},
	            		{
	            			id:"14",
	            			disease_name:"分含感冒4"
	            		},
	            		{
	            			id:"15",
	            			disease_name:"咳嗽4"
	            		},
	            		{
	            			id:"16",
	            			disease_name:"脱发4"
	            		},
	            	],
	            	"5":[
	            		{
	            			id:"17",
	            			disease_name:"青春痘5"
	            		},
	            		{
	            			id:"18",
	            			disease_name:"分含感冒5"
	            		},
	            		{
	            			id:"19",
	            			disease_name:"咳嗽5"
	            		},
	            		{
	            			id:"20",
	            			disease_name:"脱发5"
	            		},
	            	],

	            },
	            department:[
	            	{
	            		id:"1",
	            		department_name:"皮肤科",
	            	},
	            	{
	            		id:"2",
	            		department_name:"呼吸内科",
	            	},
	            	{
	            		id:"3",
	            		department_name:"消化内科",
	            	},
	            	{
	            		id:"4",
	            		department_name:"眼科",
	            	},
	            	{
	            		id:"5",
	            		department_name:"普外科",
	            	}
	            ],
	            department_disease:{
	            	"1":[
	            		{
	            			id:"1",
	            			disease_name:"青春痘"
	            		},
	            		{
	            			id:"2",
	            			disease_name:"分含感冒"
	            		},
	            		{
	            			id:"3",
	            			disease_name:"咳嗽"
	            		},
	            		{
	            			id:"4",
	            			disease_name:"脱发"
	            		},
	            	],
	            	"2":[
	            		{
	            			id:"5",
	            			disease_name:"青春痘2"
	            		},
	            		{
	            			id:"6",
	            			disease_name:"分含感冒2"
	            		},
	            		{
	            			id:"7",
	            			disease_name:"咳嗽2"
	            		},
	            		{
	            			id:"8",
	            			disease_name:"脱发2"
	            		},
	            	],
	            	"3":[
	            		{
	            			id:"9",
	            			disease_name:"青春痘3"
	            		},
	            		{
	            			id:"10",
	            			disease_name:"分含感冒3"
	            		},
	            		{
	            			id:"11",
	            			disease_name:"咳嗽33"
	            		},
	            		{
	            			id:"12",
	            			disease_name:"脱发3"
	            		},
	            	],
	            	"4":[
	            		{
	            			id:"13",
	            			disease_name:"青春痘4"
	            		},
	            		{
	            			id:"14",
	            			disease_name:"分含感冒4"
	            		},
	            		{
	            			id:"15",
	            			disease_name:"咳嗽4"
	            		},
	            		{
	            			id:"16",
	            			disease_name:"脱发4"
	            		},
	            	],
	            	"5":[
	            		{
	            			id:"17",
	            			disease_name:"青春痘5"
	            		},
	            		{
	            			id:"18",
	            			disease_name:"分含感冒5"
	            		},
	            		{
	            			id:"19",
	            			disease_name:"咳嗽5"
	            		},
	            		{
	            			id:"20",
	            			disease_name:"脱发5"
	            		},
	            	],

	            },
			}
		},
		watch:{
			disease_db(val,oldVal){
				console.log(val);
				this.mass = val.mass;
				// this.mass_disease = val.mass_disease;
				this.department = val.department;
				// this.department_disease = val.department_disease;
			}
		},
		methods:{
			level_first_index(index,id){
				this.level_first_sel_index = index;
				this.mass_id = id;
				this.department_id = id;
			},
			sel_cate(){
				this.level_first_sel_index=0,
				this.mass_id = 1;
				this.department_id = 1;
			}
		},
		created(){
	        let htm_size = document.getElementsByTagName('html')[0].style.fontSize;
	        this.w_height = window.screen.height - parseInt(htm_size)*1.6;
	    }
	}
</script>
<style scoped> 
	.vux-button-group > a.vux-button-tab-item-last{
		border-radius: 0px;
	}
	.vux-button-group > a.vux-button-tab-item-last:after{
		border-radius: 0px;
	}
	.vux-button-group > a.vux-button-tab-item-first{
		border-radius: 0px;
	}
	.vux-button-group > a.vux-button-tab-item-first:after{
		border-radius: 0px;
	}
	.vux-button-group > a{
		height: .6rem;
		font-size: .3rem;
    	line-height: .6rem;
	}
	#disease_db{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	#disease_db .disease_list {
        font-size: .35rem;
    }
    #disease_db .disease_list .level_first{
        float: left;
        width: 25%;
        height: 762px;
        overflow-y: scroll;
    }
    #disease_db .disease_list .level_first .disease_position_wrapper{
        height: 1.6rem;
        text-align: center;
        border-right: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        background-color: #eee;
    }
    #disease_db .disease_list .level_first .disease_position_wrapper p{
    	font-size: .27rem;
    	line-height: .3rem;
    }
    #disease_db .disease_list .level_first .disease_position_wrapper .icon{
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
        display: inline-block;
        overflow: hidden;
    }
    #disease_db .disease_list .level_first .disease_position_wrapper .icon img{
        width: 100%;
    }
    #disease_db .disease_list .level_first .active{
    	border-right: 0px;
        background-color: #fff;
    }
    #disease_db .disease_list .level_second{
        float: right;
        width: 72%;
        height: 762px;
        overflow-y: scroll;       
    }
    #disease_db .disease_list .level_second .disease{
        padding: .3rem;
        border-bottom: 1px solid #ccc;
    }
</style>