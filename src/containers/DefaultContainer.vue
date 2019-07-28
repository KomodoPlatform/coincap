<template>
  <div class="app">
    <div class="header">
      Cryptocurrencies:  100  •  Markets:  777  •  Market Cap:  $777,777,777  •  24h Vol:  $777,777
    </div>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <div class="row">
            <h2>
                <img class="m-top-30 logo" src="../../public/logo_w.svg" height="30"> 
                Antara Market Cap
                <b-form-input class="search" placeholder="Search"></b-form-input>
            </h2>
            <hr>
          </div>
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
  computed: {

  }
}
</script>

<style scoped>
  .main{
    margin-top:10px
  }
  .header, .footer{
    font-size:12px;
    padding:10px;
  }
  h2{
    width:100%;
    display: block;
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
