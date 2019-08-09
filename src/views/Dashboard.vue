<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row headers">
          <div class="col-12 col-md-2">
            Blockchain (Ticker)
          </div>
          <div class="col-12 col-md-2">
            Market Cap
          </div>
          <div class="col-12 col-md-1">
            Last price
          </div>
          <div class="col-12 col-md-1">
            24H Price Change
          </div>
          <div class="col-12 col-md-1">
            24H Volume
          </div>
          <div class="col-12 col-md-1">
            24H Volume Change
          </div>
          <div class="col-12 col-md-1">
            Current block height
          </div>
          <div class="col-12 col-md-1">
            Last notarized height
          </div>
          <div class="col-12 col-md-1">
            Last notarized block
          </div>
        </div>
        <div v-for="chain in chains" v-bind:key="chain.ticker.symbol">
          <div class="row chain-row" v-on:click="goToChain(chain)">
            <div class="col-12 col-md-2">
              {{chain.ticker.name}} ({{chain.ticker.symbol}})
            </div>
            <div class="col-12 col-md-2">
              $ {{chain.ticker.quotes.USD.market_cap}}
            </div>
            <div class="col-12 col-md-1">
              $ {{chain.ticker.quotes.USD.price}}
            </div>
            <div class="col-12 col-md-1 change_24h" v-bind:class="{ negative: chain.priceNegative }">
              <span v-if="chain.ticker.quotes.USD.percent_change_24h >= 0">+</span>{{chain.ticker.quotes.USD.percent_change_24h}}%
            </div>
            <div class="col-12 col-md-1">
              $ {{chain.ticker.quotes.USD.volume_24h}}
            </div>
            <div class="col-12 col-md-1 change_24h" v-bind:class="{ negative: chain.volNegative }">
              <span v-if="chain.ticker.quotes.USD.volume_24h_change_24h >= 0">+</span>{{chain.ticker.quotes.USD.volume_24h_change_24h}}%
            </div>
            <div class="col-12 col-md-1">
              {{chain.status.info.blocks}}
            </div>
            <div class="col-12 col-md-1">
              {{chain.status.info.notarized}}
            </div>
            <div class="col-12 col-md-1">
              {{chain.notarizedhash}}
            </div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'dashboard',
  components: {},
  data: function () {
    return {
        isLoading: true,
        apiurl: window.config.API_URL,
        axios: window.axios,
        chains: []
    }
  },
  mounted (){
    const app = this
  },
  methods: {
    goToChain(chain){
      const app = this
      app.$router.push({ path: `/chains/${chain.komodo_coin_id.toLowerCase()}` }) 
    },
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted(){
    const app = this
    axios.get(app.apiurl + '/api/v1/tickers').then(result => {
      app.isLoading = false
      app.chains = result.data

      //order chains
      app.chains.sort(function(a, b) {
          return b.ticker.quotes.USD.market_cap - a.ticker.quotes.USD.market_cap;
      });

      //format values
      for(var x in app.chains){
        if(app.chains[x].ticker.name === ''){
          app.chains[x].ticker.name = app.chains[x].ticker.symbol.toLowerCase()
          app.chains[x].ticker.name = app.chains[x].ticker.name.charAt(0).toUpperCase() + app.chains[x].ticker.name.slice(1)
        }
        app.chains[x].ticker.quotes.USD.market_cap = app.formatMoney(app.chains[x].ticker.quotes.USD.market_cap)
        app.chains[x].ticker.quotes.USD.volume_24h = app.formatMoney(app.chains[x].ticker.quotes.USD.volume_24h)
        app.chains[x].ticker.quotes.USD.price = app.formatMoney(app.chains[x].ticker.quotes.USD.price)
        app.chains[x].ticker.quotes.USD.volume_24h_change_24h = app.formatMoney(app.chains[x].ticker.quotes.USD.volume_24h_change_24h)
        app.chains[x].ticker.quotes.USD.percent_change_24h = app.formatMoney(app.chains[x].ticker.quotes.USD.percent_change_24h)

        app.chains[x].notarizedhash = app.chains[x].notarizedhash.substr(0,6) + '...' + app.chains[x].notarizedhash.substr(-6)

        if(app.chains[x].ticker.quotes.USD.percent_change_24h < 0){
            app.chains[x].priceNegative = true
        }
        if(app.chains[x].ticker.quotes.USD.volume_24h_change_24h < 0){
            app.chains[x].volNegative = true
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
    .headers{
      font-size:18px;
      font-weight:bold;
      border-bottom:1px solid #ddd;
      padding-bottom:10px;
      margin: 10px 0;
    }
    .chain-row{
      padding:5px 0;
    }
    .chain-row:hover{
      cursor:pointer;
      opacity: 0.6;
    }
</style>
