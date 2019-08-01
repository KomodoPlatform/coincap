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
            key: 'ticker.name',
            sortable: true,
            label: 'AssetChain'
          },
          {
            key: 'ticker.symbol',
            sortable: true,
            label: 'Ticker'
          },
          {
            key: 'ticker.rank',
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
            key: 'notarizedhash',
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
      app.$router.push({ path: `/chains/${chain.ticker.id}` }) 
    }
  },
  mounted(){
    const app = this
    axios.get(app.apiurl + '/api/v1/tickers').then(result => {
      app.chains = result.data
      window.chains = app.chains
    }).catch(error => {
        alert('Can\'t get data from API!')
    })
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
