<script>
    //Progressive line chart animation inspired from source: https://www.youtube.com/watch?v=0_jpfai4_4A
    import {afterUpdate} from "svelte"
    import {Chart, registerables} from "chart.js"
    import {coinsList, subscriptions} from "../../../stores/systemd"
    Chart.register(...registerables)

    export let coinId
    let COIN
    let chart

    const triangleStylingUp = "height: 0; width: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 10px solid green;"
    const triangleStylingDown = "height: 0; width: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 10px solid red;"

    COIN = $coinsList.filter(coin => {if(coin.id === coinId ) return coin})
    console.log(COIN)

    function subscribeWatch(){
        $subscriptions.push({
            rank: COIN[0].market_cap_rank, 
            image: COIN[0].image,
            name: COIN[0].name, 
            marketCap: COIN[0].market_cap,
            price: COIN[0].current_price,
            volume: COIN[0].total_volume,
            supply: COIN[0].total_supply
        })
    }

    afterUpdate(async() => {
            const result = await fetch(`/api/coins${coinId}`)
            const {data} = await result.json()
            console.log(data)
            const {prices} = data
            console.log(data)

            const ctx = chart.id
            const delay = 5000 / prices.length
            const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y
            const coinChart = new Chart(ctx, { 
                type: 'line',
                labels:["1","2","3","4","5","6","7"],
                data:{
                    datasets: [{
                        label: coinId,
                        data: prices,
                        backgroundColor: "rgba(0,0,0,.5)",
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
                            text: `Recent 7 days movements for ${coinId}`
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
                            display: false,
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
    <div id="subscription-options">
        <h1>{COIN[0].name} developments</h1>
        <button on:click|preventDefault={subscribeWatch}>subscribe</button>
    </div>
    <div id="coin-chart-container">
        <canvas bind:this={chart} id="coinChart" height="350" width="650"></canvas>
        <div id="refresh-effect-background">
            <div id="refresh-bar"></div>
        </div>
    </div>
    <div id="stats-overview-call-to-action">
        <h1>Symbol "{COIN[0].symbol}" recent stats</h1>
        <button>buy</button>
    </div>
    <div id="coin-data">
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>Current price</h3>
                <p>{COIN[0].current_price}</p>
            </div>
       </div>
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>24h change</h3>
                <p>
                    Value: 
                    <span style={ COIN[0].price_change_24h.toString()[0] === '-' ? triangleStylingDown : triangleStylingUp}></span>
                    {COIN[0].price_change_24h}
                </p>
                <p> Percentage:
                    <span style={ COIN[0].price_change_percentage_24h.toString()[0] === '-' ? triangleStylingDown : triangleStylingUp}></span>
                    {COIN[0].price_change_percentage_24h}
                </p>
            </div>
       </div>
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>Total volume</h3>
                <p>{COIN[0].total_volume}</p>
            </div>
       </div>
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>Total supply</h3>
                <p>{COIN[0].total_supply}</p>
            </div>
       </div>
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>Market cap</h3>
                <p>{COIN[0].market_cap}</p>
            </div>
       </div>
       <div class="coin-data-container">
            <div class="coin-data-container-inner">
                <h3>Market rank</h3>
                <p>{COIN[0].market_cap_rank}</p>
            </div>
       </div>
    </div>
</div>


<style>
    #coin-statistics-container{
        display: flex;
        flex-direction: column;
        height: 650px;
        width: 800px;
        background: white;
    }

    #subscription-options{
        display: flex;
        height: 70px;
        width: 90%;
        margin:auto;
    }

    h1{
        margin: 0 auto 0 0;
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
        background: rgba(0,0,0,.1);
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

    #stats-overview-call-to-action{
        display: flex;
        height: 100px;
        width: 90%;
        margin: auto;
        justify-content: space-between;
        align-items: center;
    }

    #coin-data{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 10px;
        height: 300px;
        width: fit-content;
        margin: 0 auto;
    }

    .coin-data-container{
        display: flex;
        flex-direction: column;
        height: 70px;
        width: 250px;
        padding: 10px 0;
        background: rgba(255,255,255,.5);
        align-self: center;
        justify-self: center;
        border-radius: 20px;
        box-shadow: 1px 1px 9px 1px lightgrey;
    }

    .coin-data-container h3, 
    .coin-data-container p{
        margin: 0;
    }

    .coin-data-container p{
        display: flex;
        align-items: center;
    }

    .coin-data-container > *{
        margin-left: 20px;
    }
    
    .coin-data-container-inner{
        display: flex;
        flex-direction: column;
        margin: auto;
    }
    
    .coin-data-container-inner p span{
        margin: 0 5px;
    }
    
    button{
        display: flex;
        height: 35px;
        width: fit-content;
        min-width: 70px;
        color: #333;
        margin: 0 5px;
        background: lightgrey;
        outline: none;
        align-items: center;
        justify-content: center;
        display: flex;
        border-radius: 50px;
        transition: background .5s ease-in;
    }

    button:hover{
        background: rgba(100,100,100,.5);
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