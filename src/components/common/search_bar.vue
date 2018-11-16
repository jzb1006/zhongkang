<template>
    <div id="search">
        <div class="-widget-top-bar" id="searchbar-head">
            <router-link :to="{name:'Search'}">
                <div class="searchbar-input">
                    <span class="zk-icon-sousuo"></span>
                    <form action="#" onsubmit="return false" class="search-wrapper">
                        <input id="searchInput" type="search" >
                    </form>
                </div>
            </router-link>
            <div class="curr-location">{{address}}</div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import BMap from '@/api/BMap';
    export default {
        name:"search_bar",
        data() {
            return {
                //   address:''
            }
        },
        computed: {
            ...mapState({
                address: state => state.BMap.city
            })
        },
        props: {
            title: {
                default: ''
            },
            iconShow: {
                default: false
            }
        },
        methods: {
            $_ajax_location() {
                BMap.addressDetail(this)
            }
        },
        mounted() {
            this.$_ajax_location();
        }
    }
</script>
<style scoped>
    .-widget-top-bar {
        height: 1rem;
    }
    .-widget-top-bar .page-title {
        position: fixed;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        color: #333;
        font-size: 0.3rem;
        text-align: center;
        background-color: #fff;
        z-index: 4000;
    }
    .-widget-top-bar .curr-location {
        padding: 0 15px;
        left: 0;
        color: #72dacf;
        font-size: .65rem;
        max-width: 4.5rem;
        font-size: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .-widget-top-bar .curr-location,
    .-widget-top-bar .show-search,
    .-widget-top-bar .show-user {
        top: 0;
        height: 44px;
        line-height: 44px;
        z-index: 4001;
        position: fixed;
        text-align: center;
    }
    .-widget-top-bar .show-search {
        right: 0.2rem;
        width: 44px;
    }
    .-widget-top-bar .curr-location,
    .-widget-top-bar .show-search,
    .-widget-top-bar .show-user {
        top: 0.35rem;
        height: 0.3rem;
        line-height: 0.3rem;
        z-index: 4001;
        position: fixed;
        text-align: center;
    }

   
    .-widget-top-bar .icon {
        font-size: 0.4rem;
        color: #ee003e;
    }
    .-widget-top-bar .show-user {
        right: 0.3rem;
        width: 0.3rem;
    }
    #searchbar-head .searchbar-input {
        padding-left: 0.4rem;
        padding-right: 0.3rem;
        background-color: #f5f5f5;
        line-height: 0.6rem;
        height: 0.6rem;
        flex: 1;
        font-size: 0.28rem;
        color: #b8b8b8;
        border: 1px solid #ccc;
        border-radius: 999px;
        display: flex;
        margin: 0.15rem 0.1rem 0 2rem;
    }
    #searchbar-head .searchbar-input input {
        font-size: 0.28rem;
        text-shadow: 0px 0px 0px #555;
        -webkit-text-fill-color: transparent;
        background-color: inherit;
        width: 100%;
        margin-left: 0.2rem;
    }
    #searchbar-head .searchbar-input input::-webkit-input-placeholder {
        color: #ccc;
        text-shadow: 0px 0px 0px #b8b8b8;
        -webkit-text-fill-color: initial;
    }
    #searchbar-head .searchbar-input input::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
</style>