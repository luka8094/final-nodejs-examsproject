<script>
    import {subscriptions} from "../../stores/systemd"
    import SubscriptionContainer from "../components/subscriptions/SubscriptionContainer.svelte"
</script>

<section>
    <div id="subscriptions-container">
        <h1>Subscriptions</h1>
        {#each $subscriptions as sub}
            <SubscriptionContainer 
                image={sub.image}
                name={sub.name}
                rank={sub.rank}
                marketCap={sub.marketCap}
                price={sub.price}
                volume={sub.volume}
                supply={sub.supply}
                />
        {/each}
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
        padding-top: calc(var(--menu-padding) + 50px);
        background: rgba(200,200,150,.1);
        align-items: center;
    }

    #subscriptions-container{
        display: flex;
        flex-direction: column;
        width: 1000px;
        align-items: center;
        justify-content: center;
    }

    h1{
        display: flex;
        border-bottom: solid 2px black;
        width: 100%;
    }
</style>