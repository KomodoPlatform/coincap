<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row m-top-30">
            <div class="col-4 detail-row">
                <h3>
                    {{ chain.ticker.name }}
                    <span style="font-size:15px">{{ chain.ticker.symbol }}</span>
                </h3>
                <br>
                <strong>Rank:</strong> 1<br>
                <strong>CMC Rank:</strong> {{ chain.ticker.rank }}<br>
                <strong>Website:</strong> <a target="_blank" href="https://komodoplatform.com">komodoplatform.com</a><br>
                <strong>Explorer:</strong> <a target="_blank" href="https://kmdexplorer.io">kmdexplorer.io</a><br>
                <strong>Source Code:</strong> <a target="_blank" href="https://github.com/KomodoPlatform">GitHub</a><br>
                <strong>Community:</strong> <a target="_blank" href="#">Discord</a> • <a target="_blank" href="#">Reddit</a> • <a target="_blank" href="#">Telegram</a><br>
                <strong>Markets:</strong>  <a target="_blank" href="#">Binance</a> • <a target="_blank" href="#">CryptoBridge</a> • <a target="_blank" href="#">DigitalPrice</a><br>
                <strong>Info:</strong>  <a target="_blank" href="#">CoinMarketCap</a> • <a target="_blank" href="#">CoinGecko</a>
                <hr>
                <h4>Blockchain informations</h4>
                <strong>Blocks:</strong> {{ chain.status.info.blocks }}<br>
                <strong>Last notarized block: </strong> {{ chain.status.info.notarized }}<br>
                <strong>Consensus:</strong> PoW / PoS<br>
                <strong>Version:</strong> {{ chain.status.info.version }}<br>
                <strong>Protocol:</strong> {{ chain.status.info.protocolversion }}<br>
                <strong>Difficulty:</strong> {{ chain.status.info.difficulty }}<br>
            </div>
            <div class="col-8">
                <h3>
                    ${{ chain.ticker.quotes.USD.price }}
                    <span style="font-size:15px" class="change_24h" v-bind:class="{ negative: isNegative }">
                        (<span v-if="chain.ticker.quotes.USD.percent_change_24h > 0">+</span>{{ chain.ticker.quotes.USD.percent_change_24h }})
                    </span>
                </h3>
                <div class="row">
                    <div class="col">
                        Market Cap<br>
                        ${{ chain.ticker.quotes.USD.market_cap }}
                    </div>
                    <div class="col">
                        Volume (24h)<br>
                        ${{ chain.ticker.quotes.USD.volume_24h }}
                    </div>
                    <div class="col">
                        Circulating Supply<br>
                        {{ chain.ticker.circulating_supply }} {{ chain.ticker.symbol }}
                    </div>
                    <div class="col">
                        Max Supply<br>
                        {{ chain.ticker.max_supply }} {{ chain.ticker.symbol }}
                    </div>
                </div>
                <line-chart></line-chart>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../shared/Chart'

export default {
  name: 'chain',
  components: {
      LineChart
  },
  data: function () {
    return {
        isLoading: true,
        apiurl: window.config.API_URL,
        axios: window.axios,
        chain: {},
        isNegative: false
    }
  },
  mounted (){
    const app = this
    axios.get(app.apiurl + '/api/v1/tickers/' + app.$route.params.chain ).then(result => {
      app.chain = result.data
      app.isLoading = false
      if(app.chain.ticker.quotes.USD.percent_change_24h < 0){
          app.isNegative = true
      }
    }).catch(error => {
        alert('Can\'t get data from API!')
    })
  },
  methods: {
    
  }
}
</script>

<style scoped>
    .change_24h{
        color:greenyellow
    }
    .negative{
        color:#f00
    }
    .detail-row strong{
        margin-right:10px;
    }
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
