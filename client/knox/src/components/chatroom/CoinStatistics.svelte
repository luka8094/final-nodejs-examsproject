<script>
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
</div>


<style>
    div{
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 100%;
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
</style>