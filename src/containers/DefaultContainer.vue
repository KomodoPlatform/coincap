<template>
  <div class="app">
    <div class="top-header">
      Cryptocurrencies: {{ chains.length }} • Market Cap: ${{ marketcap_total }} •  24h Vol: ${{ volume_24h_total }}
    </div>
    <div class="header">
      <h4>
          <a href="#">
            <img v-on:click="goToDashboard" class="m-top-30 logo" src="../../public/logo_w.svg" height="30"> 
          </a>
          Antara Market Cap
          <div class="search">
            <b-form-input v-model="searcher" placeholder="Search"></b-form-input>
            <div class="search-results" v-if="results.length > 0">
                <div class="search-result" v-for="chain in results" v-bind:key="chain.ticker.id" v-on:click="goToChain(chain)">
                  <img :src="chain.logo" height="20" style="float:left;margin-right:10px"> {{ chain.ticker.name }}
                </div>
            </div>
          </div>
      </h4>
    </div>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <div class="footer">
      Built by <a href="https://komodoplatform.com" target="_blank">KomodoPlatform</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DefaultContainer',
  components: {

  },
  data () {
    return {
      searcher: '',
      chains: [],
      apiurl: window.config.API_URL,
      marketcap_total: 0,
      volume_24h_total: 0
    }
  },
  mounted (){
    const app = this
    axios.get(app.apiurl + '/api/v1/tickers').then(result => {
      app.chains = result.data
      for(var x in app.chains){
        let chain = app.chains[x]
        app.marketcap_total += chain.ticker.quotes.USD.market_cap
        app.volume_24h_total += chain.ticker.quotes.USD.volume_24h
      }
      app.marketcap_total = app.formatMoney(app.marketcap_total)
      app.volume_24h_total = app.formatMoney(app.volume_24h_total)
    }).catch(error => {
        alert('Can\'t get data from API!')
    })
  },
  methods: {
    goToDashboard(){
      const app = this
      app.$router.push({ path: `/` }) 
    },
     goToChain(chain){
      const app = this
      app.searcher = ''
      app.$router.push({ path: `/chains/${chain.ticker.symbol.toLowerCase()}` }) 
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
  computed: {
    results: function(){
        const app = this;
        return app.chains.filter(
          function(chain){
            if(app.searcher.length === 0){
              return false
            }
            return chain.ticker.name.toLowerCase().indexOf(app.searcher.toLowerCase()) >= 0;})
    }
  }
}
</script>

<style scoped>
  .main{
    margin-top:10px
  }
  .header, .footer, .top-header{
    font-size:12px;
    padding:10px;
  }
  .header{
    border-bottom:1px solid #eee;
    padding-bottom:15px;
  }
  h2{
    width:100%;
    display: block;
  }
  .logo{
      float:left;
      margin-right:20px;
      margin-top:-3px;
  }
  .search{
      float:right;
      width:200px;
      margin-top:0px;
      position:relative;
  }
  .search-results{
    position:absolute;
    top:30px; 
    left:0;
    width:100%;
    background:#fff;
    border-radius:5px;
    color:#555;
    font-size:13px;
    overflow:hidden;
  }
  .search-result{
    padding:10px;
  }
  .search-result:hover{
    cursor:pointer;
    background:#ddd
  }
</style>
