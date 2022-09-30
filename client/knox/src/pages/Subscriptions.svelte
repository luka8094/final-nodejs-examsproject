<script>
    import SubscriptionContainer from "../components/subscriptions/SubscriptionContainer.svelte"

    const testArray = [1,2,3,4,5,6,7,8,9,10]
</script>

<section>
    <div id="subscriptions-container">
        <h1>Subscriptions</h1>
        {#each testArray as sub }
            <SubscriptionContainer />
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