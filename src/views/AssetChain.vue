<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row m-top-30">
            <div class="col-4">
                <h3>
                    {{ chain.name }}
                    <span style="font-size:15px">{{ chain.ticker }}</span>
                </h3>
            </div>
            <div class="col-8">
                <h3>
                    {{ chain.price }}
                    <span style="font-size:15px">({{ chain.change_24h }})</span>
                </h3>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'chain',
  components: {},
  data: function () {
    return {
        isLoading: true,
        chain: { name: 'Komodo (KMD)', id: 'kmd-komodo', market_cap: '$777,777,777', price: '777USD', vol_24h: '777,777USD', change_24h: '+12%', last_notarization: '2 min ago', cmc_rank: 51 }
    }
  },
  mounted (){
    const app = this
    setTimeout(function(){
      app.isLoading = false
    },1000)
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
