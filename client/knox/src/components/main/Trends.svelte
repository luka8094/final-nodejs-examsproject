<script>
    import {onMount} from "svelte"
    import TrendingContainer from "./TrendingContainer.svelte"
    import {trending} from "../../../stores/systemd"

    onMount(async() => {
        const result = await fetch("/api/coins/trending")
        const {data} = await result.json()
        $trending = data
    })
</script>

<section>
    <header id="trends-section-title">
        <h1>Currently trending</h1>
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
        padding-bottom: 50px;
    }

    #trends-section-title{
        display: flex;
        height: 50px;
        width: calc(100% - 50px);
        margin: auto;
        align-items: center;
    }

    h1{
        width: 100%;
        margin: 0 25px;
    }

    #coin-ranking-container{
        display: flex;
        flex-direction: column;
        width: calc(100% - 50px);
        height: fit-content;
        margin: auto;
        padding-top: 20px;
    }
</style>