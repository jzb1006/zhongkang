<!--  -->
<template>
    <div id="map_box">
        <group>
            <cell :title="title" :value="value" is-link :link="link">
            </cell>
        </group>
    </div>
</template>

<script>
    import {
        Group,
        Cell,
    } from 'vux'
    export default {
        name: 'map_box',
        props: {
            title: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            link: {
                type: Object,
                default () {
                    return {}
                }
            }
        },

        data() {
            return {
            };
        },
        components: {
            Group,
            Cell,
        },
        methods: {},
        mounted() {},
    }
</script>
<style>
    #map_box .weui-cells {
        font-size: 0.3rem!important;
        padding: 0 0.2rem!important;
    }
</style>