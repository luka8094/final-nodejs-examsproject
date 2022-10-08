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
    <header id="trends-sorting-options">
        <button>Alphabetical</button>
        <button>Highest</button>
        <button>Lowest</button>
    </header>
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

    #trends-sorting-options{
        display: flex;
        flex-direction: row-reverse;
        height: 50px;
        width: calc(100% - 50px);
        margin: auto;
        background: rgba(120,100,120,.5);
        align-items: center;
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