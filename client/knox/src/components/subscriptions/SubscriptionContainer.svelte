<script>
    import {createEventDispatcher} from "svelte"
    let rank="rank", symbol="symbol", marketCap="market cap", price="price", volume="volume", tendency="tendency"

    const dispatch = createEventDispatcher()

    function removeSubscription(){
        dispatch('removeSubscription',{value: true})
    }
</script>

<div id="subscription-container">
    <div id="coin-data">
        <tbody>
            <td>{rank}</td>
            <td>{symbol}</td>
            <td>{marketCap}</td>
            <td>{price}</td>
            <td>{volume}</td>
            <td>{tendency}</td>
        </tbody>
    </div>
    <div id="subscription-options">
        <button>watch</button>
        <button on:click={removeSubscription}>remove</button>
    </div>
</div>

<style>
    #subscription-container{
        display: flex;
        height: 60px;
        width: 100%;
        margin: 10px 0;
        padding: 5px;
        background: rgba(50,100,150,.5);
        border-radius: 25px;
        box-shadow: 1px 1px 20px 1px grey;
    }

    #coin-data{
        display: flex;
        height: inherit;
        width: 100%;
        background: rgba(100,100,110,.5);
    }

    tbody{
        display: flex;  
        width: 100%;  
        background: rgba(100,10,100,.1);
        justify-content: space-around;
    }

    #subscription-options{
        display: flex;
        height: 50px;
        margin-left: auto;
        width: 150px;
        background: rgba(50,50,50,.5);
        align-self: center;
        justify-content: center;
        align-items: center;
    }

    button{
        display: flex;
        width: fit-content;
        height: 35px;
        margin: 0 5px;
    }
</style>