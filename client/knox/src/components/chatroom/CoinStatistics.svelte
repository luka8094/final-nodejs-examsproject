<script>
    let chart

    const dummyData = [
        {X:10,y:0},
        {X:0,y:10},
        {X:100,y:9},
        {X:20,y:31},
        {X:150,y:100},
        {X:200,y:150},
        {X:50,y:60},
        {X:70,y:90},
        {X:100,y:110},
        {X:200,y:10},
    ]

    function subscribeWatch(){
        console.log("Clicked on 'subscribe to watch'.")
    }

    function favourite(){
        console.log("Clicked on 'favourite'.")
    }
</script>

<div>
    Coin statisctics overview component
    <div id="subscription-options">
        <button on:click={subscribeWatch}>add to subscriptions</button>
        <button on:click={favourite}>favourite</button>
    </div>
    <canvas bind:this={chart} id="chart"></canvas>
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

    #chart{
        height: 350px;
        width: 700px;
        background: white;
        margin: 0 auto;
    }
</style>