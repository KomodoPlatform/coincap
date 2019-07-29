<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row m-top-30">
            <div class="col-4 detail-row">
                <h3>
                    {{ chain.name }}
                    <span style="font-size:15px">{{ chain.ticker }}</span>
                </h3>
                <br>
                <strong>Rank:</strong> 1<br>
                <strong>CMC Rank:</strong> 51<br>
                <strong>Website:</strong> <a target="_blank" href="https://komodoplatform.com">komodoplatform.com</a><br>
                <strong>Explorer:</strong> <a target="_blank" href="https://kmdexplorer.io">kmdexplorer.io</a><br>
                <strong>Source Code:</strong> <a target="_blank" href="https://github.com/KomodoPlatform">GitHub</a><br>
                <strong>Community:</strong> <a target="_blank" href="#">Discord</a> • <a target="_blank" href="#">Reddit</a> • <a target="_blank" href="#">Telegram</a><br>
                <strong>Markets:</strong>  <a target="_blank" href="#">Binance</a> • <a target="_blank" href="#">CryptoBridge</a> • <a target="_blank" href="#">DigitalPrice</a><br>
                <strong>Info:</strong>  <a target="_blank" href="#">CoinMarketCap</a> • <a target="_blank" href="#">CoinGecko</a>
                <hr>
                <h4>Blockchain informations</h4>
                <strong>Blocks:</strong> 77777<br>
                <strong>Last notarized block: </strong> 777777777777777777777777<br>
                <strong>Consensus:</strong> PoW / PoS<br>
                <strong>Version:</strong> 777777<br>
                <strong>Protocol:</strong> 777777<br>
                <strong>Difficulty:</strong> 777777<br>
            </div>
            <div class="col-8">
                <h3>
                    ${{ chain.price }}
                    <span style="font-size:15px">({{ chain.change_24h }})</span>
                </h3>
                <div class="row">
                    <div class="col">
                        Market Cap<br>
                        777.777.777$
                    </div>
                    <div class="col">
                        Volume (24h)<br>
                        777.777$
                    </div>
                    <div class="col">
                        Circulating Supply<br>
                        777.777 KMD
                    </div>
                    <div class="col">
                        Max Supply<br>
                        777.777.777 KMD
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
        chain: { name: 'Komodo (KMD)', id: 'kmd-komodo', market_cap: '$777,777,777', price: '777 USD', vol_24h: '777,777USD', change_24h: '+12%', last_notarization: '2 min ago', cmc_rank: 51 }
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
