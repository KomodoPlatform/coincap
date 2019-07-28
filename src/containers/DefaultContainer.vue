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
          <b-form-input class="search" placeholder="Search"></b-form-input>
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
      
    }
  },
  methods: {
    goToDashboard(){
      const app = this
      app.$router.push({ path: `/` }) 
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
  }
</style>
