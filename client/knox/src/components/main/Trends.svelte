<script>
    import {onMount} from "svelte"
    import TrendingContainer from "./TrendingContainer.svelte"
    import {trending} from "../../../stores/systemd"

    $: trendingTest = []

    onMount(async() => {
        const result = await fetch("/api/coins/trending")
        const {data} = await result.json()
        trendingTest = data
        $trending = data
    })

    console.log(trendingTest)
</script>

<section>
    <header id="trends-section-title">
        <h1>Currently trending</h1>
        <!--<button>Alphabetical</button>
        <button>Highest</button>
        <button>Lowest</button>-->
    </header>
    <div id="coin-ranking-container">
        {#each $trending as coinTest, i}
            <TrendingContainer  
            position={i}
            image={coinTest.item.large}
            marketRank={coinTest.item.market_cap_rank}
            name={coinTest.item.name} 
            symbol={coinTest.item.symbol}
            price={coinTest.item.price_btc}
            />
        {/each}    
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 100%;
        /*background: rgba(10,20,30,.5);*/
        padding-bottom: 50px;
    }

    #trends-section-title{
        display: flex;
        height: 50px;
        width: calc(100% - 50px);
        margin: auto;
        /*background: rgba(120,100,120,.5);*/
        align-items: center;
    }

    h1{
        width: 100%;
        margin: 0 25px;
    }

    #trends-sorting-options button:nth-child(1){
        margin-right: 20px;
    }

    button{
        height: 35px;
        margin: 0 2px;
    }

    #coin-ranking-container{
        display: flex;
        flex-direction: column;
        width: calc(100% - 50px);
        /*background: rgba(100,100,10,.5);*/
        height: fit-content;
        margin: auto;
        padding-top: 20px;
    }
</style>