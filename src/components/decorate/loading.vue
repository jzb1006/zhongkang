<template>
    <div id="loding">
        <spinner :type="'lines'" :size="'1rem'"></spinner>
    </div>
</template>
<script>
    import {
        Spinner,
    } from 'vux'
    export default {
        components: {
            Spinner,
        },
    }
</script>
<style>
    #loding {
        position: absolute;
        top: 4rem;
        left: 3.5rem;
        z-index: 99999;
    }
    #loding .vux-spinner {
        stroke: #ff5370!important;
    }
</style>