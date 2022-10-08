<script>
    import {onMount} from "svelte"
    import {Chart, registerables} from "chart.js"
    Chart.register(...registerables)
    let chart

    function subscribeWatch(){
        console.log("Clicked on 'subscribe to watch'.")
    }

    function favourite(){
        console.log("Clicked on 'favourite'.")
    }
    
    onMount(async () => {
        const coinId = 'bitcoin'
        const result = await fetch(`/api/coins${coinId}`)
        const {data} = await result.json()
        const prices = data['prices']
        const chartData = prices
        console.log(prices[2][0].length , prices[1],  chartData)    

        const ctx = chart.id
        const coinChart = new Chart(ctx, { 
            type: 'line',
            data:{
                datasets: [{
                    label: "Bitcoin",
                    data: prices,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor:"dimgrey",
                    radius: 1.5,
                    pointHoverRadius: 5,
                    tension: 0
                }]
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
                    padding: 0
                },
                plugins:{
                    legend: false,
                    decimation: {
                        enabled: false,
                        algorithm: 'min-max'
                    }
                },
                animations:{
                    duration: 1000,
                    easing: 'linear'
                },
                scales: {
                    x:{
                        type: 'linear',
                        display: false,
                        grid:{
                            borderColor: "lightgrey"
                        },
                        ticks:{
                            stepSize: 100_000_000
                        }
                    },
                    y: {
                        display: false,
                    }

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
    <canvas bind:this={chart} id="coinChart"></canvas>
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
        background: rgba(50,50,100,.5)
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

    #coinChart{
        background: white;
        margin: 0 auto;
        height: 350px;
        width: 650px;
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
</style>