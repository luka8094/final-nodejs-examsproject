<script>
    import {onMount} from "svelte"
    import {Chart, registerables} from "chart.js"
    Chart.register(...registerables)
    let chart

    const dummyData = [{x:0,y:10},{x:1,y:8},{x:1,y:6},{x:5,y:5},{x:100,y:12},
    {x:80,y:8},{x:2,y:16},{x:1,y:17},{x:7,y:6},{x:10,y:7},{x:2,y:6},{x:10,y:10}]

    function subscribeWatch(){
        console.log("Clicked on 'subscribe to watch'.")
    }

    function favourite(){
        console.log("Clicked on 'favourite'.")
    }
    
    onMount(async () => {
        const result = await fetch("/api/coins")
        console.log(result)    

        const ctx = chart.id
        const coinChart = new Chart(ctx, { 
            type: 'line',
            data:{
                datasets: [{
                    label: "Bitcoin",
                    data: dummyData,
                    backgroundColor: "white",
                    borderColor:"black",
                    spanGaps: true,
                    fill: true,
                    radius: 2.5,
                    tension: 0.2
                }]
            },
            options:{
                title: {
                    display: true,
                    text: (ctx) => 'Historical point: '+ ctx.chart.options.plugins.tooltip.position
                },
                intersection:{
                    intersect: false,
                    mode: 'index'
                },
                plugins:{
                    legend: false
                },
                scales: {
                    x:{
                        type: 'linear'
                    }
                }
            }
        })
    })
</script>

<div>
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
    div{
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
        width: 700px;
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