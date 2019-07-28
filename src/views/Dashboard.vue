<template>
    <div>
        <loader v-if="isLoading"></loader>
        <b-table class="f-white" striped hover :items="items"></b-table>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'dashboard',
  components: {},
  data: function () {
    return {
        isLoading: true,
        items: [
          { name: 'Komodo', market_cap: '$777,777,777', price: '777USD', vol_24h: '777,777USD', last_notarization: '2 min ago' }
        ]
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
    .m-top-30{
        margin-top:20px
    }
    .f-white, .table-hover tbody tr:hover{
        color:#fff!important
    }
</style>
