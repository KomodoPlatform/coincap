<template>
    <div>
        <loader v-if="isLoading"></loader>
        <h2 class="text-center m-top-30">Top Antara chains ordered by Market Capitalization</h2>
        <div v-if="chains">
          <b-table responsive class="f-white m-top-30" @row-clicked="goToChain" striped hover :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="chains"></b-table>
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
        sortBy: 'ticker.quotes.USD.market_cap',
        sortDesc: true,
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
            key: 'ticker.quotes.USD.market_cap',
            sortable: true,
            label: 'Market Cap'
          },
          {
            key: 'ticker.quotes.USD.price',
            sortable: true,
            label: 'Price'
          },
          {
            key: 'ticker.quotes.USD.volume_24h',
            sortable: true,
            label: '24h Volume'
          },
          {
            key: 'ticker.quotes.USD.percent_change_24h',
            sortable: true,
            label: '24h Change'
          },
          {
            key: 'notarizedhash',
            sortable: false,
            label: 'Last block notarized'
          },
        ],
        chains: []
    }
  },
  mounted (){
    const app = this
  },
  methods: {
    goToChain(chain){
      const app = this
      app.$router.push({ path: `/chains/${chain.ticker.symbol.toLowerCase()}` }) 
    }
  },
  mounted(){
    const app = this
    axios.get(app.apiurl + '/api/v1/tickers').then(result => {
      for(var x in result.data){
        let chain = result.data[x]
        if(chain.ticker.name !== undefined && chain.ticker.name !== ''){
          chain.ticker.quotes.USD.price = '$' + chain.ticker.quotes.USD.price
          chain.ticker.quotes.USD.volume_24h = '$' + chain.ticker.quotes.USD.volume_24h
          chain.ticker.quotes.USD.market_cap = '$' + chain.ticker.quotes.USD.market_cap
          app.chains.push(chain)
        }
      }
    }).catch(error => {
        console.log(error)
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
