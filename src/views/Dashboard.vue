<template>
    <div>
        <h2>
            <img class="m-top-30 logo" src="../../public/logo_w.svg" height="30"> 
            Antara Market Cap
            <b-form-input class="search" placeholder="Search"></b-form-input>
        </h2>
        <hr>
        <b-table class="f-white" striped hover :items="items"></b-table>
    </div>
</template>

<script>

export default {
  name: 'dashboard',
  components: {},
  data: function () {
    return {
        items: [
          { name: 'Komodo', market_cap: '$777,777,777', price: '777USD', vol_24h: '777,777USD', last_notarization: '2 min ago' }
        ]
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
    .m-top-30{
        margin-top:20px
    }
    .f-white, .table-hover tbody tr:hover{
        color:#fff!important
    }
    .logo{
        float:left;
        margin-right:20px;
        margin-top:2px;
    }
    .search{
        float:right;
        width:200px;
        margin-top:0px;
    }
</style>
