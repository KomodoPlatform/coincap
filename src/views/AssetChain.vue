<template>
    <div>
        <loader v-if="isLoading"></loader>
        <div class="row m-top-30">
            <div class="col-12 col-md-4 detail-row">
                <strong>CMC Rank:</strong> {{ chain.ticker.rank }}<br><br>
                <strong>Website:</strong><br>
                <span v-for="link in chain.additional_data.links.homepage" v-bind:key="link">
                    <a target="_blank" v-if="link !== ''" :href="link">{{link}}<br></a>
                </span>
                <br>
                <strong>Blockchain explorer:</strong><br>
                <span v-for="link in chain.additional_data.links.blockchain_site" v-bind:key="link">
                    <a target="_blank" v-if="link !== ''" :href="link">{{link}}<br></a>
                </span>
                <br>
                <strong>Source Code:</strong><br>
                <span v-for="(link, index)  in chain.additional_data.links.repos_url" v-bind:key="index">
                    <span v-if="link.length > 0">
                        <span v-for="url in link" v-bind:key="url">
                            <a target="_blank" v-if="url !== ''" :href="link">{{url}}<br></a>
                        </span>
                    </span>
                </span>
                <br>
                <strong>Announcements:</strong><br>
                <span v-for="link in chain.additional_data.links.announcement_url" v-bind:key="link">
                    <a target="_blank" v-if="link !== ''" :href="link">{{link}}<br></a>
                </span>
                <br>
                <strong>Chat:</strong><br>
                <span v-for="link in chain.additional_data.links.chat_url" v-bind:key="link">
                    <a target="_blank" v-if="link !== ''" :href="link">{{link}}<br></a>
                </span>
                <br>
                <hr>
                <h4>Blockchain informations</h4>
                <strong>Blocks:</strong> {{ chain.status.info.blocks }}<br>
                <strong>Last notarized block: </strong> {{ chain.status.info.notarized }}<br>
                <strong>Version:</strong> {{ chain.status.info.version }}<br>
                <strong>Protocol:</strong> {{ chain.status.info.protocolversion }}<br>
                <strong>Difficulty:</strong> {{ chain.status.info.difficulty }}<br>
            </div>
            <div class="col-12 col-md-8">
                <h3>
                    {{ chain.ticker.name }}
                    <span style="font-size:15px">{{ chain.ticker.symbol }}</span>
                </h3>
                <h3>
                    ${{ chain.ticker.quotes.USD.price }}
                    <span style="font-size:15px" class="change_24h" v-bind:class="{ negative: isNegative }">
                        (<span v-if="chain.ticker.quotes.USD.percent_change_24h > 0">+</span>{{ chain.ticker.quotes.USD.percent_change_24h }})
                    </span>
                </h3>
                <div class="row">
                    <div class="col">
                        <strong>Market Cap</strong><br>
                        ${{ chain.ticker.quotes.USD.market_cap }}
                    </div>
                    <div class="col">
                        <strong>Volume (24h)</strong><br>
                        ${{ chain.ticker.quotes.USD.volume_24h }}
                    </div>
                    <div class="col">
                        <strong>Circulating Supply</strong><br>
                        {{ chain.ticker.circulating_supply }} {{ chain.ticker.symbol }}
                    </div>
                    <div class="col">
                        <strong>Max Supply</strong><br>
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
        chain: {
            ticker:{
                rank: '',
                quotes: {
                    USD: {}
                }
            },
            additional_data: {
                links: {}
            },
            status: {
                info: {}
            }
        },
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
      app.chain.ticker.quotes.USD.market_cap = app.formatMoney(app.chain.ticker.quotes.USD.market_cap)
      app.chain.ticker.quotes.USD.volume_24h = app.formatMoney(app.chain.ticker.quotes.USD.volume_24h)
    }).catch(error => {
        alert('Can\'t get data from API!')
    })
  },
  methods: {
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
