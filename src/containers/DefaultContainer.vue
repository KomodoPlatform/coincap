<template>
  <div class="app">
    <div class="top-header">
      Cryptocurrencies:  100  •  Markets:  777  •  Market Cap:  $777,777,777  •  24h Vol:  $777,777
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
                <div class="search-result" v-for="chain in results" v-bind:key="chain.id" v-on:click="goToChain(chain)">
                  <img :src="chain.logo" height="20" style="float:left;margin-right:10px"> {{ chain.name }}
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
      chains: [
        { name: 'Komodo (KMD)', id: 'kmd-komodo', market_cap: '$777,777,777', price: '777USD', vol_24h: '777,777USD', change_24h: '+12%', last_notarization: '2 min ago', cmc_rank: 51 }
      ]
    }
  },
  methods: {
    goToDashboard(){
      const app = this
      app.$router.push({ path: `/` }) 
    },
     goToChain(chain){
      const app = this
      app.$router.push({ path: `/chains/${chain.id}` }) 
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
            return chain.name.toLowerCase().indexOf(app.searcher.toLowerCase()) >= 0;})
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
