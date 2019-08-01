<template>
    <div>
        <loader v-if="isLoading"></loader>
        <h2 class="text-center m-top-30">Top Antara chains ordered by Market Capitalization</h2>
        <div v-if="chains">
          <b-table responsive class="f-white m-top-30" @row-clicked="goToChain" striped hover :fields="fields" :items="chains"></b-table>
        </div>
    </div>
</template>

<script>

export default {
  name: 'dashboard',
  components: {},
  data: function () {
    return {
        isLoading: false,
        apiurl: window.config.API_URL,
        axios: window.axios,
        fields: [
          {
            key: 'name',
            sortable: true,
            label: 'AssetChain (Ticker)'
          },
          {
            key: 'market_cap',
            sortable: true,
            label: 'Market Cap'
          },
          {
            key: 'cmc_rank',
            sortable: true,
            label: 'Coin Market Cap Rank'
          },
          {
            key: 'price',
            sortable: true,
            label: 'Price'
          },
          {
            key: 'vol_24h',
            sortable: true,
            label: '24h Volume'
          },
          {
            key: 'change_24h',
            sortable: true,
            label: '24h Change'
          },
          {
            key: 'last_notarization',
            sortable: false,
            label: 'Last block notarized'
          },
        ],
        chains: window.chains
    }
  },
  mounted (){
    const app = this
  },
  methods: {
    goToChain(chain){
      const app = this
      app.$router.push({ path: `/chains/${chain.id}` }) 
    }
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
</style>
