import api from '@/api/user'
const mixin = {
    props:{
        number:{
            default:""
        },
        params:{
            default:function(){
                return {}
            }
        }
    }
};
const login_mixin = {
    methods:{
        checkLogin(obj){
            api.checkLogin().then(res=>{
                this.$router.push({name:'container',query:obj})
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
export {mixin,login_mixin};