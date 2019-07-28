<template>
    <div class="loader-wrapper"></div>
</template>

<script>
    export default {
        name: 'loader'
    }
</script>
<style scoped>
    .loader-wrapper{
        position:fixed;
        width:100%; 
        height:100%; 
        top:0;
        left:0;
        z-index:99999999;
        background-color: #1e2938;
        background-image: url('../../public/loader.svg');
        background-position:center;
        background-repeat: no-repeat;
    }
</style>