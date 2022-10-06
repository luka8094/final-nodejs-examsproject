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
    
    onMount(() => {
    const ctx = document.getElementById("coinChart")
    const coinChart = new Chart(ctx, { 
        type: 'line',
        data:{ 
            labels: ["Jan","Feb","Mar","apr","May",
            "Jun","Jul","Aug","Sep", "Oct","Nov","Dec"],
            datasets: [{
                label: "2015",
                data: dummyData,
                backgroundColor: "white",
                borderColor:"black",
                fill: true,
                radius: 1
            }]
        },
        options:{}
    })})
</script>

<div>
    Coin statisctics overview component
    <div id="subscription-options">
        <button on:click={subscribeWatch}>add to subscriptions</button>
        <button on:click={favourite}>favourite</button>
    </div>
    <canvas id="coinChart"></canvas>
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
        height: 600px;
        width: 800px;
    }
</style>