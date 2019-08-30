<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row headers">
          <div class="col-12 col-md-2 sort-header" v-on:click="sortChainsBy('name')">
            Blockchain (Ticker) <span v-if="(sort === 'asc' && field ==='name')" class="arrow up">↑</span><span v-if="(sort === 'desc' && field ==='name')" class="arrow down">↓</span>
          </div>
          <div class="col-12 col-md-2 sort-header" v-on:click="sortChainsBy('marketcap')">
            Market Cap <span v-if="(sort === 'asc' && field ==='marketcap')"  class="arrow up">↑</span><span v-if="(sort === 'desc' && field ==='marketcap')" class="arrow down">↓</span>
          </div>
          <div class="col-12 col-md-2 sort-header" v-on:click="sortChainsBy('lastprice')">
            Last price (24h change) <span v-if="(sort === 'asc' && field ==='lastprice')" class="arrow up">↑</span><span v-if="(sort === 'desc' && field ==='lastprice')" class="arrow down">↓</span>
          </div>
          <div class="col-12 col-md-2 sort-header" v-on:click="sortChainsBy('volume')">
            24H Volume (24h change) <span v-if="(sort === 'asc' && field ==='volume')" class="arrow up">↑</span><span v-if="(sort === 'desc' && field ==='volume')" class="arrow down">↓</span>
          </div>
          <div class="col-12 col-md-1">
            Block height
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
              <img :src="chain.ticker.logo" style="float:left; margin-right: 10px" width="25" height="25"> {{chain.ticker.name}} ({{chain.ticker.symbol}})
            </div>
            <div class="col-12 col-md-2">
              $ {{chain.ticker.quotes.USD.market_cap}}
            </div>
            <div class="col-12 col-md-2">
              $ {{chain.ticker.quotes.USD.price}}
              (<span class="change_24h" v-bind:class="{ negative: chain.priceNegative }"><span v-if="chain.ticker.quotes.USD.percent_change_24h >= 0">+</span>{{chain.ticker.quotes.USD.percent_change_24h}}%</span>)
            </div>
            <div class="col-12 col-md-2">
              $ {{chain.ticker.quotes.USD.volume_24h}}
              (<span class="change_24h" v-bind:class="{ negative: chain.volNegative }"><span v-if="chain.ticker.quotes.USD.volume_24h_change_24h >= 0">+</span>{{chain.ticker.quotes.USD.volume_24h_change_24h}}%</span>)
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
        chains: [],
        sort: 'desc',
        field: 'marketcap'
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
    },
    sortChainsBy(what){
      const app = this
      if(app.field === what){
        if(app.sort === 'asc'){
          app.sort = 'desc'
        }else{
          app.sort = 'asc'
        }
      }else{
        app.sort = 'desc'
      }
      app.field = what

      app.chains.sort(function(a, b) {
          if(app.field !== 'name'){
            if(app.sort === 'desc'){
              return parseFloat(b.filters[app.field]) - parseFloat(a.filters[app.field]);
            }else{
              return parseFloat(a.filters[app.field]) - parseFloat(b.filters[app.field]);
            }
          }else{
            var nameA=a.filters[app.field].toLowerCase(), nameB=b.filters[app.field].toLowerCase();
            if(app.sort === 'desc'){
              if(nameA > nameB){
                return -1
              }
            }else{
              if(nameA < nameB){
                return -1
              }
            }
          }
      });
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
        app.chains[x].filters = {}
        app.chains[x].filters.marketcap = app.chains[x].ticker.quotes.USD.market_cap
        app.chains[x].filters.lastprice = app.chains[x].ticker.quotes.USD.price
        app.chains[x].filters.volume = app.chains[x].ticker.quotes.USD.volume_24h
        app.chains[x].filters.name = app.chains[x].ticker.name

        app.chains[x].ticker.logo = 'https://raw.githubusercontent.com/jl777/coins/master/icons/'+ app.chains[x].ticker.symbol.toLowerCase()+'.png'
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
      font-size:14px;
      border-bottom:1px solid #ddd;
      padding-bottom:10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .chain-row:hover{
      cursor:pointer;
      opacity: 0.6;
    }
    .arrow{
      font-size:20px;
      float:right;
      margin-top:-6px;
    }
    .sort-header:hover{
      cursor:pointer;
      opacity: 0.5;
    }
</style>
