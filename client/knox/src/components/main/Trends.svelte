<script>
    const testArray = [
        {id: 1, coin: "something 1"},
        {id: 2, coin: "something 2"},
        {id: 3, coin: "something 3"},
        {id: 4, coin: "something 4"},
    ]
</script>

<section>
    Trending section
    <div id="coin-ranking-container">
        {#each testArray as coinTest}
            <p>{coinTest.id} {coinTest.coin}</p>
        {/each}
    </div>
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        height: 60vh;
        width: 100%;
        background: rgba(10,20,30,.5);
    }

    #coin-ranking-container{
        display: flex;
        flex-direction: column;
        width: calc(100% - 50px);
        background: rgba(100,100,10,.5);
        height: fit-content;
        margin: auto;
    }

    p{
        display: flex;
        height: 50px;
        width: calc(100% - 60px);
        margin: 10px auto;
        background: aliceblue;
        border-radius: 20px;
        padding: 5px;
    }
</style>