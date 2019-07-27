<template>
  <div class="app">
    <div class="header">
      Cryptocurrencies:  100  •  Markets:  777  •  Market Cap:  $777,777,777  •  24h Vol:  $777,777
    </div>
    <div class="app-body">
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <TheFooter>
      <div>
        KomodoPlatform
      </div>
    </TheFooter>
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

<style>
  .main{
    margin-top:10px
  }
  .header{
    font-size:12px;
    padding:10px;
  }
</style>
