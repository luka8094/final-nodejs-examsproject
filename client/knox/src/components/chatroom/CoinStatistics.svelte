<script>
    //Progressive line chart animation inspired from source: https://www.youtube.com/watch?v=0_jpfai4_4A
    import {onMount} from "svelte"
    import {Chart, registerables} from "chart.js"
    Chart.register(...registerables)
    let chart
    export let coinName

    function subscribeWatch(){
        console.log("Clicked on 'subscribe to watch'.")
    }

    function favourite(){
        console.log("Clicked on 'favourite'.")
    }
    
    onMount(async () => {
        console.log(coinName, chart.Utils)
        const coinId = 'bitcoin'
        const result = await fetch(`/api/coins${coinId}`)
        const {data} = await result.json()
        const {prices} = data

        const ctx = chart.id
        const delay = 5000 / prices.length
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
        const coinChart = new Chart(ctx, { 
            type: 'line',
            labels:[["1","2","3","4","5","6","7"]],
            data:{
                labels:[["1","2","3","4","5","6","7"]],
                datasets: [{
                    label: "Bitcoin",
                    data: prices,
                    backgroundColor: Utils.transparentize(rgba(0,0,0,.5)),
                    borderWidth: 1,
                    borderColor:"dimgrey",
                    radius: 1.5,
                    pointHoverRadius: 5,
                    tension: 0
                }]
            },
            Tooltip:{

            },
            options:{
                title: {
                    display: true,
                    text: (ctx) => 'Coin history point: '+ ctx.chart.options.plugins.tooltip.position
                },
                intersection:{
                    intersect: false,
                    mode: 'nearest'
                },
                layout:{
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                plugins:{
                    legend: false,
                    title: {
                        display: true,
                        text: "Recent 7 days movements for Bitcoin"
                    }
                },
                animation:{
                    x:{
                        type: 'number',
                        easing: 'linear',
                        duration: 10000,
                        from: NaN,
                        delay(ctx){
                            if(ctx.type !== 'data' || ctx.xStarted) return 0
                            ctx.xStarted = true
                            return ctx.index * delay
                        }
                    },
                    y:{
                        type: 'number',
                        easing: 'linear',
                        duration: 10000,
                        from: previousY,
                        delay(ctx){
                            if(ctx.type !== 'data' || ctx.yStarted) return 0
                            ctx.yStarted = true
                            return ctx.index * delay
                        }

                    }
                },
                scales: {
                    x:{
                        type: 'linear',
                        grid:{
                            borderColor: "lightgrey",
                          
                        },
                        min: prices[0][0],
                        max: prices[prices.length -1 ][0]
                    },
                }
            }
        })
    })
</script>

<div id="coin-statistics-container">
    Coin statisctics overview component
    <div id="subscription-options">
        <button on:click={subscribeWatch}>add to subscriptions</button>
        <button on:click={favourite}>favourite</button>
    </div>
    <div id="coin-chart-container">
        <canvas bind:this={chart} id="coinChart" height="350" width="650"></canvas>
        <div id="refresh-effect-background">
            <div id="refresh-bar"></div>
        </div>
    </div>
    coin stats
    <div id="coin-data">
       <div class="coin-data-container">
        price
       </div>
       <div class="coin-data-container">
        trend
       </div>
       <div class="coin-data-container">
        volume
       </div>
       <div class="coin-data-container">
        market cap
       </div>
    </div>
</div>


<style>
    #coin-statistics-container{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 800px;
        background: white;
    }

    #subscription-options{
        display: flex;
        flex-direction: row-reverse;
        height: 50px;
        width: 100%;
    }

    button{
        display: flex;
        height: 35px;
        color: #333;
        margin: 0 5px;
        background-color: #f4f4f4;
        outline: none;
        width: fit-content;
    }

    #coin-chart-container{
        display: flex;
        position: relative;
        width: 650px;
        height: 100%;
        justify-content: center;
        margin: auto;
        z-index: 0;
    }
    
    #coinChart{
        position: absolute;
        background: rgba(255,255,255,.1);
        margin: 0 auto;
        height: 350px;
        width: 650px;
        z-index: 0;
    }

    #refresh-effect-background{
        display: flex;
        position: absolute;
        height: 100%;
        width: 600px;
        background: rgba(50,100,150,.5);
        overflow: hidden;
        z-index: -1;
    }

    #refresh-bar{
        display: flex;
        position: relative;
        height: 500px;
        width: 30px;
        opacity: 0;
        background: linear-gradient(-90deg, white, transparent, transparent);
        left: -10px;
        animation: refresh 5s infinite;
    }

    #coin-data{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        height: 300px;
        width: 100%;
        background: rgba(0,150,151,.5);
    }

    .coin-data-container{
        display: flex;
        height: 70px;
        width: 250px;
        background: rgba(255,255,255,.5);
        align-self: center;
        justify-self: center;
    }

    @keyframes
    refresh {
        0%{
            left: -100px;
            opacity: 1;
        }
        100%{
            left: 700px;
            opacity: 0;
        }
    }
</style>