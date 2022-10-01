<script>
    import SubscriptionContainer from "../components/subscriptions/SubscriptionContainer.svelte"

    let testArray = [1,2,3,4,5,6,7,8,9,10]

    function removeThis(event){
        console.log(event, event.detail.value)
        if(event.detail)testArray.pop()
        testArray = testArray
        
    }
</script>

<section>
    <div id="subscriptions-container">
        <h1>Subscriptions</h1>
        {#each testArray as sub }
            <SubscriptionContainer on:removeSubscription={removeThis}/>
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